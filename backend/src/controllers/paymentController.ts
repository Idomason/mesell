import { Request, Response, NextFunction } from "express";
import { AppError } from "../middleware/errorHandler.js";
import * as paystackService from "../services/paystackService.js";
import { PaystackService } from "@/services/paystack-test.js";
import { IOrder, Order } from "../models/OrderModel.js";
import { Payment } from "../models/PaymentModel.js";
import { catchAsync } from "@/utils/catchAsync.js";
import {
  createSellerAcctSchema,
  validate,
  CreateSellerAcctSchema,
} from "@/lib/zodSchema.js";

const paystack = PaystackService.create();

export const initializePayment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);

export const verifyPayment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
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
      next(new AppError("Failed to verify payment", 500));
    }
  },
);

export const releasePayment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
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
        payment.escrowId,
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
      next(new AppError("Failed to release payment", 500));
    }
  },
);

export const refundPayment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
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
        reason,
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
      next(new AppError("Failed to refund payment", 500));
    }
  },
);

export const createSellerEscrowAccount = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const validated = validate(createSellerAcctSchema, req.body);
    try {
      const {
        business_name,
        settlement_bank,
        account_number,
        currency,
        percentage_charge,
        primary_contact_email,
        primary_contact_name,
        primary_contact_phone,
      } = validated;

      if (
        !business_name ||
        !settlement_bank ||
        !account_number ||
        !currency ||
        percentage_charge === undefined ||
        !primary_contact_email ||
        !primary_contact_name ||
        !primary_contact_phone
      ) {
        return next(
          new AppError(
            "Missing required fields: business_name, settlement_bank, account_number, percentage_charge, primary_contact_email, primary_contact_name, primary_contact_phone, currency",
            400,
          ),
        );
      }

      // Check for duplicate account number & business_name
      const existingAccount =
        await paystackService.findSellerByBusinessAndAccountNumber(
          account_number,
          business_name,
        );

      if (existingAccount) {
        return next(
          new AppError(
            "A seller account with this account number and business name already exists",
            400,
          ),
        );
      }

      // Get bank code from Paystack
      const bankCode = await paystackService.getBankCode(settlement_bank);

      const payload: CreateSellerAcctSchema = {
        business_name,
        settlement_bank: bankCode.data,
        account_number,
        currency,
        percentage_charge,
        primary_contact_email,
        primary_contact_name,
        primary_contact_phone,
        metadata: {
          custom_fields: [
            {
              display_name: "Order ID",
              variable_name: "order_Hydnf7895833ndha",
              value: "ORD_123",
            },
          ],
        },
      };

      // Create subaccount (seller account) on Paystack
      const createdSeller = await paystackService.createSellerAccount(payload);
      if (!createdSeller) {
        return next(new AppError("Seller account creation failed", 400));
      }
      res.status(200).json({
        status: "success",
        data: createdSeller,
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to create seller account";
      next(new AppError(message, 500));
    }
  },
);
