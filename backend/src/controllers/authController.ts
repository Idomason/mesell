import crypto from "crypto";
import { User } from "@/models/User.js";
import { sendEmail } from "@/utils/email.js";
import { signToken } from "@/utils/signToken.js";
import { catchAsync } from "@/utils/catchAsync.js";
import { AppError } from "@/middleware/errorHandler.js";
import { Request, Response, NextFunction } from "express";

// Sign up a new user
export const signup = catchAsync(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { firstName, lastName, email, password, passwordConfirm } = req.body;

  // Check if all the expected fields exists
  if (!firstName || !lastName || !email || !password || !passwordConfirm) {
    return next(new AppError("Please fill in all fields", 400));
  }

  // Create and save the new user to DB
  const user = new User({
    firstName,
    lastName,
    email,
    password,
    passwordConfirm,
  });

  await user.save();

  const token = signToken(user._id);

  // Send a response to client
  res.status(201).json({
    status: "success",
    token,
    data: { user },
    message: "User account created successfully",
  });
});

// Login user
export const login = catchAsync(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, password } = req.body;

  // Check if all fields exists
  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  // Check if the user with the supplied email exists and password is correct
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.comparePassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  // If everything is ok, send token to the client
  const token = signToken(user._id);

  res
    .status(200)
    .json({ status: "success", message: "User logged in successfully", token });
});

// Forgot Password
export const forgotPassword = catchAsync(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  // 1.) Get user based on the POSTed email
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new AppError("No user found with this email address", 404));
  }

  // 2.) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3.) Send it to user's email
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/reset-password/${resetToken}`;

  const message = `Forgot your password? Kindly send a password reset request with your new password and confirm password to: ${resetURL} \nIf you didn't forget your password, kindly ignore this email. Thanks!`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Your Password Reset Token (valid for 10 mins)",
      message,
    });

    res.status(200).json({
      status: "success",
      message: "Kindly check your email to reset your password",
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError("Somthing went wrong, please try again later", 500)
    );
  }
});

// Reset Password
export const resetPassword = catchAsync(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Get the user based on the token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // If token has not expired and there is user, set the new password
  if (!user) {
    return next(new AppError("Invalid or expired token", 400));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // Update changePasswordAt property for the user
  // Log the user in, send JWT
  const token = signToken(user._id);
  res
    .status(200)
    .json({ status: "success", message: "Password reset successful", token });
});
