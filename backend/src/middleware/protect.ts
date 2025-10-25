import jwt from "jsonwebtoken";
import { promisify } from "util";

import { User } from "@/models/User.js";
import { AppError } from "./errorHandler.js";
import { catchAsync } from "@/utils/catchAsync.js";
import { Request, Response, NextFunction } from "express";

exports.protect = catchAsync(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  let token;

  //   Getting the token and check if it's there
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError(
        "You are not logged in yet, please login to gain access.",
        401
      )
    );
  }

  //   Verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //   Check user still exists
  const user = await User.findById(decoded.id);
  if (!user) {
    return next(
      new AppError("The user belonging to this token no longer exist", 401)
    );
  }

  //   Check if user changed password after the token was issued
  if (user.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed password, login to gain access", 401)
    );
  }

  // Grant access to protected route
  req.user = user;
  next();
});

exports.redirectTo = function (...roles: string[]) {
  return function (req: Request, res: Response, next: NextFunction) {
    if (!req.user) {
      return next(
        new AppError("You must be logged in to perform this action", 401)
      );
    }

    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }

    next();
  };
};
