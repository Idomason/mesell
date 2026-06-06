import jwt from "jsonwebtoken";
import { promisify } from "util";
import { Request, Response, NextFunction } from "express";

import { AppError } from "./errorHandler.js";
import { IUser, User } from "../models/UserModel.js";
import { catchAsync } from "@/utils/catchAsync.js";

interface JwtPayload {
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export const protect = catchAsync(async function (
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // 1) Check if token exists
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    throw new AppError(
      "You are not logged in! Please log in to get access.",
      401,
    );
  }

  // 2) Verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const user = await User.findById(decoded.id);

  if (!user) {
    throw new AppError(
      "The user belonging to this token no longer exists.",
      401,
    );
  }

  // 4) Grant access to protected route
  req.user = user;

  next();
});

// Restrict access permission
export const restrictTo = function (...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(
        new AppError("You must be logged in to perform this action", 401),
      );
    }

    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403),
      );
    }

    next();
  };
};
