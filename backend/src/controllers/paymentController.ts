import { Request, Response, NextFunction } from "express";
import { AppError } from "../middleware/errorHandler.js";
import { PaystackService } from "../services/paystackService.js";
import { Order } from "../models/Order.js";
import { Payment } from "../models/Payment.js";

const paystackService = PaystackService.getInstance();

export const initializePayment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);

    if (!order) {
      throw new AppError("Order not found", 404);
    }

    const { authorizationUrl, reference } =
      await paystackService.initializeEscrowPayment(order);

    // Create payment record
    await Payment.create({
      order: orderId,
      amount: order.totalAmount,
      currency: "NGN",
      paymentMethod: "card", // Default to card, can be updated based on user selection
      paymentReference: reference,
      status: "pending",
    });

    res.status(200).json({
      status: "success",
      data: {
        authorizationUrl,
        reference,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const verifyPayment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { reference } = req.params;
    const payment = await Payment.findOne({ paymentReference: reference });

    if (!payment) {
      throw new AppError("Payment not found", 404);
    }

    const isSuccessful = await paystackService.verifyPayment(reference);

    if (!isSuccessful) {
      throw new AppError("Payment verification failed", 400);
    }

    // Create escrow transaction
    const escrowId = await paystackService.createEscrowTransaction(payment);

    // Update payment and order status
    await Payment.findByIdAndUpdate(payment._id, {
      status: "success",
      escrowId,
    });

    await Order.findByIdAndUpdate(payment.order, {
      paymentStatus: "paid",
    });

    res.status(200).json({
      status: "success",
      message: "Payment verified successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const releasePayment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orderId = req.params?.id;
    const userId = req.user?.id; // Assuming user info is attached by auth middleware

    const order = await Order.findById(orderId);

    if (!order) {
      throw new AppError("Order not found", 404);
    }

    if (order.buyer.toString() !== userId) {
      throw new AppError("Not authorized to release payment", 403);
    }

    const payment = await Payment.findOne({ order: orderId });

    if (!payment) {
      throw new AppError("Payment not found", 404);
    }

    const success = await paystackService.releaseEscrowPayment(
      payment.escrowId
    );

    if (!success) {
      throw new AppError("Failed to release payment", 400);
    }

    // Update payment and order status
    await Payment.findByIdAndUpdate(payment._id, {
      status: "released",
      releasedAt: new Date(),
    });

    await Order.findByIdAndUpdate(orderId, {
      paymentStatus: "released",
    });

    res.status(200).json({
      status: "success",
      message: "Payment released successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const refundPayment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orderId = req.params?.id;
    const { reason } = req.body;
    const userId = req.user?.id; // Assuming user info is attached by auth middleware

    const order = await Order.findById(orderId);

    if (!order) {
      throw new AppError("Order not found", 404);
    }

    if (order.buyer.toString() !== userId) {
      throw new AppError("Not authorized to refund payment", 403);
    }

    const payment = await Payment.findOne({ order: orderId });

    if (!payment) {
      throw new AppError("Payment not found", 404);
    }

    const success = await paystackService.refundEscrowPayment(
      payment.escrowId,
      reason
    );

    if (!success) {
      throw new AppError("Failed to refund payment", 400);
    }

    // Update payment and order status
    await Payment.findByIdAndUpdate(payment._id, {
      status: "refunded",
      refundReason: reason,
      refundedAt: new Date(),
    });

    await Order.findByIdAndUpdate(orderId, {
      paymentStatus: "refunded",
    });

    res.status(200).json({
      status: "success",
      message: "Payment refunded successfully",
    });
  } catch (error) {
    next(error);
  }
};
