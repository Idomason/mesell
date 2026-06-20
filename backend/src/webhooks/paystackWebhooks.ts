import crypto from "crypto";
// import { paystackClient } from "@/services/paystackService.js";
import { PaystackService } from "@/services/paystack-test";
import { getEnv } from "@/lib/env.js";
import { catchAsync } from "@/utils/catchAsync";
import type { NextFunction, Request, Response } from "express";
import { AppError } from "@/middleware/errorHandler";
import { Order } from "@/models/OrderModel";
import { Payment } from "@/models/PaymentModel";
import { sendGuestUserClaimEmail } from "@/utils/email";

const env = getEnv();

const paystack = PaystackService.create();

export const paystackWebhookHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const paystackSignature = req.headers["x-paystack-signature"] as string;

      if (!paystackSignature) {
        throw new AppError("Missing signature header", 401);
      }

      const secret = env.PAYSTACK_SECRET_KEY;
      if (!secret) {
        throw new AppError("PAYSTACK_SECRET_KEY is not configured.", 400);
      }

      // ADD THESE DEBUGGING LOGS:
      console.error("--- PAYSTACK WEBHOOK DEBUG ---");
      console.error("Received Signature Header:", paystackSignature);
      console.error("Type of req.body:", typeof req.body);
      console.error("Raw Body Length:", req.body ? req.body.length : 0);
      console.error(
        "Raw Body Content Sample:",
        typeof req.body === "string" ? req.body.substring(0, 100) : req.body,
      );

      // Verify Signature (CRITICAL)
      const expectedSignature = crypto
        .createHmac("sha256", secret)
        .update(JSON.stringify(req.body))
        .digest("hex");

      const isValidSignature = crypto.timingSafeEqual(
        Buffer.from(expectedSignature, "utf-8"),
        Buffer.from(paystackSignature, "utf-8"),
      );

      if (!isValidSignature) {
        return next(new AppError("Invalid signature", 403));
      }

      res.status(200).json({ status: "success" });

      const payload = JSON.parse(req.body.toString("utf-8"));

      processPaystackWebhookAsync(payload, res).catch((err) => {
        console.log(
          `Business Logic Error processing event ${payload.event}:`,
          err,
        );
      });

      return res.sendStatus(200);
    } catch (error) {
      console.error("Error handling Paystack webhook:", error);
      return next(new AppError("Failed to handle Paystack webhook", 500));
    }
  },
);

async function handleSuccessfulPayment(reference: string, res: Response) {
  try {
    const response = await paystack.verifyPayment(reference);

    if (!response || response.status !== true) {
      return res.redirect(`${env.FRONTEND_URL}/checkout/failed`);
    }

    // Find and update payment record
    const payment = await Payment.findOne({ paymentReference: reference });

    if (!payment) {
      return new AppError("Payment record not found", 404);
    }

    // Update payment and order status based on verification result
    await Payment.findOneAndUpdate(
      { paymentReference: reference },
      {
        status: "held_in_escrow",
        paidAt: new Date(),
        metadata: {
          transactionId: response.metadata.transactionId, // Paystack's internal ID
          channel: response.metadata.channel,
          fees: response.metadata.fees,
          paid: response.metadata.paid,
          cardLast4: response.metadata.cardLast4,
          cardBrand: response.metadata.cardBrand,
        },
      },
    );

    // Update order payment status
    await Order.findOneAndUpdate(
      { _id: payment.orderId },
      { paymentStatus: "paid" },
    );

    console.log("Funds secured in wallet for:", reference);

    // Find and update guest user
    const order = await Order.findById(payment.orderId);
    if (order.isGuest && order.guestClaimToken) {
      const claimLink = `${env.FRONTEND_URL}/claim-order?token=${order.guestClaimToken}&order=${order._id}`;

      // Send Email
      const mailOptions = {
        email: order.email,
        subject: "Complete Your Pre-Order Registration",
        message: `
                  <p>Your pre-order is confirmed!</p>
                  <p>Click here to create an account and track your order: <a href="${claimLink}">Claim Order</a></p>
                  <p>This link expires in 7 days.</p>
                `,
      };
      await sendGuestUserClaimEmail(mailOptions);
    }

    return res.redirect(`${env.FRONTEND_URL}/orders/success?ref=${reference}`);
  } catch (err) {
    console.error("Error verifying payment:", err);
    return res.redirect(`${env.FRONTEND_URL}/checkout/failed`);
  }
}

// Seller funds payout
async function handleReleaseFundsToSeller(request: Request, res: Response) {}

async function processPaystackWebhookAsync(
  payload: any,
  res: Response,
): Promise<void> {
  if (payload.event === "charge.success") {
    const { reference } = payload.data;
    // Verify transaction again to be 100% sure
    handleSuccessfulPayment(reference, res);
  }

  if (payload.event === "transfer.success") {
    const { reference } = payload.data;

    handleReleaseFundsToSeller(reference, res);
  }
}
