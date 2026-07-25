import { getEnv } from "@/lib/env";
import { AppError } from "@/middleware/errorHandler";
import { Order } from "@/models/OrderModel";
import { catchAsync } from "@/utils/catchAsync";
import type { Response, NextFunction, Request } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const env = getEnv();

interface CustomJwtPayload extends JwtPayload {
  _id: string;
}

export const getAllUserOrders = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const buyerId = req.user?._id;

    const token = req.cookies.accessToken;

    const decoded = jwt.verify(token, env.JWT_SECRET) as CustomJwtPayload;

    if (buyerId?.toString() !== decoded._id.toString()) {
      return next(new AppError("Access denied, unauthorized!", 403));
    }

    const myOrders = await Order.find({ buyer: buyerId });
    console.log(`first-bk: ${myOrders}`);

    if (!myOrders) {
      return next(
        new AppError("No order associated with this user found", 404),
      );
    }

    res
      .status(200)
      .json({ status: "success", result: myOrders.length, data: { myOrders } });
  },
);

export const getSingleOrder = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);

    if (!order) {
      return next(new AppError("Order not found", 404));
    }

    return res.status(200).json({ status: "success", data: { order } });
  },
);
