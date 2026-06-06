import crypto from "crypto";
import { paystackClient } from "@/services/paystackService.js";
import { getEnv } from "@/lib/env.js";
import { catchAsync } from "@/utils/catchAsync";
import type { NextFunction, Request, Response } from "express";
import { AppError } from "@/middleware/errorHandler";

const env = getEnv();

export const paystackWebhookHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const sig = req.headers["x-paystack-signature"];
      const body = req.body;

      // Verify Signature (CRITICAL)
      const expectedSig = crypto
        .createHmac("sha256", env.PAYSTACK_SECRET_KEY)
        .update(body)
        .digest("hex");

      if (sig !== expectedSig) {
        return next(new AppError("Invalid signature", 403));
      }

      const event = JSON.parse(body);

      if (event.event === "charge.success") {
        const { reference } = event.data;
        // Verify transaction again to be 100% sure
        const verifyResponse = await paystackClient.get(
          `/transaction/verify/${reference}`,
        );
        const verifyResult = verifyResponse.data;

        if (verifyResult.success && verifyResult.data.status === "success") {
          // Update DB: Order Status -> 'HELD_IN_ESCROW'
          console.log("Funds secured in wallet for:", reference);
        }
      }

      return res.sendStatus(200);
    } catch (error) {
      console.error("Error handling Paystack webhook:", error);
      return next(new AppError("Failed to handle Paystack webhook", 500));
    }
  },
);
