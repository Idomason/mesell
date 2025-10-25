import { Request, Response, NextFunction } from "express";

export class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;
  code?: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode || 500;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

const handleCastErrorDB = function (err: any) {
  const message = `Invalid ${err.path}: ${err.value}`;

  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = function (err: any) {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate field value ${value}. Please use another value!`;

  return new AppError(message, 400);
};

const handleValidationErrorDB = function (err: any) {
  const errors = Object.values(err.errors).map((el: any) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;

  return new AppError(message, 400);
};

const handleJsonWebTokenError = function (err: any) {
  const message = "Invalid token, please login again";

  return new AppError(message, 401);
};

const handleTokenExpiredError = function (err: any) {
  const message = "Your token has expired, please login again";

  return new AppError(message, 401);
};

// Process development error
const sendDevError = function (err: AppError, res: Response) {
  console.log("HERE NOW!");
  return res.status(err.statusCode).json({
    name: err.name,
    status: err.status,
    message: err.message,
    err: err.stack,
    error: err,
  });
};

// Process production error
const sendProdError = function (err: AppError, res: Response) {
  // Trusted operational errors: can be sent to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    // Programming or other unknown errors: Don't leak the details to the client
  } else {
    // 1.) Log the error to the server console
    console.error(`ERROR 💥: ${err}`);

    // 2.) Send generic message to the client
    res.status(500).json({
      status: "fail",
      message: "Something went wrong, please try again later.",
    });
  }
};

// Global error middleware handler
export const globalErrorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (process.env.NODE_ENV === "development") {
    sendDevError(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };

    if (error.name === "CastError") error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === "ValidationError")
      error = handleValidationErrorDB(error);
    if (error.name === "TokenExpiredError")
      error = handleTokenExpiredError(error);
    if (error.name === "JsonWebTokenError")
      error = handleJsonWebTokenError(error);

    sendProdError(error, res);
  }
};
