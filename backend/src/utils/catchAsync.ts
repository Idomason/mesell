import { Request, Response, NextFunction } from "express";

const catchAsync = function (fn: Function) {
  return function (req: Request, res: Response, next: NextFunction) {
    fn(req, res, next).catch(next);
  };
};

export { catchAsync };
