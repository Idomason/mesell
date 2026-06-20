import crypto from "crypto";

import { z } from "zod";
import { getEnv } from "@/lib/env";
import { AppError } from "@/middleware/errorHandler";
import { Order } from "@/models/OrderModel";
import { Payment } from "@/models/PaymentModel";
import { PaystackService } from "@/services/paystack-test";
import { catchAsync } from "@/utils/catchAsync";
import type { Request, Response, NextFunction } from "express";
import {
  CheckoutPayload,
  CheckoutPayloadSchema,
  CreateOrderSchema,
  validateCheckout,
  validateOrder,
} from "mesell-shared";
import { Product } from "@/models/ProductModel";
import { sendGuestUserClaimEmail } from "@/utils/email";
import { User } from "@/models/UserModel";
import { signToken } from "@/utils/signToken";
import { StringDecoder } from "string_decoder";

const env = getEnv();

const paystack = PaystackService.create();

export const createCheckout = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // 1. Authenticate user boundary check
    if (!req.user) {
      return next(new AppError("Unauthorized! Please login to continue", 401));
    }

    // 2. Validate the incoming body structure against the Payload schema
    let checkoutData: CheckoutPayload;
    try {
      checkoutData = validateCheckout(CheckoutPayloadSchema, req.body);
    } catch (err) {
      if (err instanceof z.ZodError) {
        console.error(`ValidatedOrder ERR: ${err}`);
        return res.status(400).json({ status: "fail", error: err.format() });
      }

      return next(err);
    }

    const { cartItems, deliveryAddress } = checkoutData;
    if (!cartItems || cartItems.length === 0) {
      return next(new AppError("No items in cart", 400));
    }

    const processedOrderItems = [];
    let calculatedTotalAmount = 0;

    // 3. Build and calculate values securely on the server
    for (const item of cartItems) {
      // Fetch the verified product entry from MongoDB to get the authentic price & sellerId
      const product = await Product.findById(item.productId);
      if (!product) {
        return next(
          new AppError(`Product with ID ${item.productId} not found`, 400),
        );
      }

      // Check if inventory stock supports the user's purchase volume demand
      // if (product.quantity < item.quantity) {
      //   return next(
      //     new AppError(`Insufficient stock for product: ${product.name}`, 400),
      //   );
      // }

      const unitPrice = product.price ?? product.preOrderPrice; // Sourced safely from DB, not user input!
      const totalPrice = unitPrice * item.quantity;

      // Platform takes 10% commission, seller gets 90%
      const PLATFORM_FEE_PERCENT = 0.1;
      const platformFee = totalPrice * PLATFORM_FEE_PERCENT;
      const payoutAmount = totalPrice - platformFee;

      // Build out the secure order item structure matching OrderItemSchema
      processedOrderItems.push({
        productId: product._id.toString(),
        sellerId: product.sellerId.toString(),
        quantity: product.quantity,
        unitPrice,
        totalPrice,
        payoutAmount,
        deliveryAddress,
        payoutStatus: "held",
        deliveryStatus: "pending",
        refundStatus: "pending",
      });

      calculatedTotalAmount += totalPrice;
    }

    // 4. Construct the complete server-validated Order payload
    const finalOrderPayload = {
      buyerId: req.user?._id.toString(),
      email: req.user?.email ?? req.body.email,
      items: processedOrderItems,
      isGuest: req.user ? false : true,
      totalAmount: calculatedTotalAmount,
      deliveryAddress,
      paymentStatus: "pending",
      deliveryStatus: "pending",
    };

    // 5. Run a final sanity validation check against your top-level architecture layout
    // This transforms strings/dates properly and guarantees absolute model safety
    const validatedOrder = validateOrder(CreateOrderSchema, finalOrderPayload);

    // 6. Persist to DB
    const order = new Order(validatedOrder);
    await order.save();

    if (!order) {
      return next(new AppError("Order creation failed, please try again", 400));
    }

    if (order.isGuest) {
      const guestToken = crypto.randomBytes(32).toString("hex");
      const guestTokenExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

      try {
        await Order.updateOne(
          { _id: order._id },
          { guestToken, guestTokenExpiry },
        );
      } catch (error) {
        console.error(`Guest token update failed: ${error}`);
        return next(new AppError("Guest user checkout failed", 400));
      }
    }

    try {
      const allSellersIds = processedOrderItems.map((item) =>
        String(item.sellerId),
      );

      // Prepare payment initialization data
      const initPaymentData = {
        email: (req.user?.email as string) ?? req.body.email,
        amount: calculatedTotalAmount,
        orderId: order._id.toString(),
        metadata: {
          orderId: order._id.toString(),
          itemCount: order.items.length,
          sellerIds: allSellersIds,
          sellerCount: new Set(allSellersIds).size,
          paymentTrigger: "web_checkout",
        },
      };

      const paymentData = await paystack.initializePayment(initPaymentData);

      if (!paymentData) {
        return next(
          new AppError("Payment initialization failed, please try again", 400),
        );
      }

      // Create payment record
      const payment = new Payment({
        order: order._id,
        amount: calculatedTotalAmount,
        currency: "NGN",
        paymentMethod: "card",
        paymentReference: paymentData.reference,
        authorizationUrl: paymentData.authorizationUrl,
        status: "pending",
        metadata: {
          orderId: order._id.toString(),
          itemCount: order.items.length,
          sellerCount: new Set(allSellersIds).size,
        },
      });
      await payment.save();

      if (!payment) {
        return next(
          new AppError("Payment creation failed, please try again", 400),
        );
      }

      res.status(200).json({
        status: "success",
        data: {
          authorizationUrl: paymentData.authorizationUrl,
          reference: paymentData.reference,
          orderId: order._id,
        },
      });
    } catch (error) {
      console.log(`createCheckout Controller ERR: ${error}`);
      // Clean up created order if payment initialization fails
      await Order.deleteOne({ _id: order._id });
      throw error;
    }
  },
);

export const verifyPayment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reference = req.query?.reference as string;

      const paymentInfo = await paystack.verifyPayment(reference);

      if (!paymentInfo || paymentInfo.status !== true) {
        return res.redirect(`${env.FRONTEND_URL}/checkout/failed`);
      }

      // Find payment record
      const payment = await Payment.findOne({
        paymentReference: reference,
      }).populate("order");

      if (!payment) return next(new AppError("Payment record not found", 404));

      // Update payment and order status based on verification result
      await Payment.findOneAndUpdate(
        { paymentReference: reference },
        {
          status: "held_in_escrow",
          paidAt: new Date(),
          metadata: {
            transactionId: paymentInfo.metadata.transactionId, // Paystack's internal ID
            channel: paymentInfo.metadata.channel,
            fees: paymentInfo.metadata.fees,
            paid: paymentInfo.metadata.paid,
            cardLast4: paymentInfo.metadata.cardLast4,
            cardBrand: paymentInfo.metadata.cardBrand,
          },
        },
      );

      await Order.findByIdAndUpdate(payment.orderId, {
        paymentStatus: "paid",
      });

      const order = await Order.find({ paymentReference: reference });
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

      return res.redirect(
        `${env.FRONTEND_URL}/orders/success?ref=${reference}`,
      );
    } catch (error) {
      console.error("Error verifying payment:", error);
      return res.redirect(`${env.FRONTEND_URL}/checkout/failed`);
    }
  },
);

export const guestClaimOrder = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { token, order: orderId } = req.query;
    const { email, password, passwordConfirm } = req.body;

    // Validate guest user token
    const order = await Order.findOne({
      _id: orderId,
      guestClaimToken: token,
      guestClaimTokenExpiry: { $gt: new Date() },
      paymentStatus: "paid",
    });

    if (!order) {
      return next(new AppError("Invalid or expired token", 400));
    }

    // Verify email match
    if (order.email !== email) {
      return next(new AppError("Email does not match the order", 403));
    }

    // Create user or login them in if already exist
    const userExists = await User.findOne({ email }).select("+password");
    if (
      !userExists ||
      !(await userExists.comparePassword(password, userExists.password))
    ) {
      const user = new User({ email, password, passwordConfirm });
      await user.save();

      order.userId = user._id;
      order.isGuest = false;
      order.guestClaimToken = undefined;
    }

    // If everything is ok, send token to client
    const accessToken = signToken(userExists._id, res);

    return res.status(200).json({
      status: "success",
      message: "User logged in successfully",
      accessToken,
    });
  },
);

// export const refundPayment = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const { orderId } = req.params;
//     const { reason } = req.body;

//     if (!reason) {
//       return next(new AppError("Refund reason is required", 400));
//     }

//     try {
//       const order = await Order.findById(orderId).populate("payment");
//       if (!order || !order.payment) {
//         return next(new AppError("Order or payment not found", 404));
//       }

//       const payment = order.payment as PaymentDocument;

//       // Process refund through payment gateway
//       const success = await paymentService.refundPayment(
//         payment.transactionId,
//         reason,
//       );
//       if (!success) {
//         return next(new AppError("Failed to process refund", 500));
//       }

//       // Update payment and order status
//       await Payment.findByIdAndUpdate(payment._id, {
//         status: "refunded",
//         refundedAt: new Date(),
//         refundReason: reason,
//       });

//       await Order.findByIdAndUpdate(orderId, {
//         paymentStatus: "refunded",
//       });

//       res.status(200).json({
//         status: "success",
//         message: "Payment refunded successfully",
//       });
//     } catch (error) {
//       console.error("Error processing refund:", error);
//       return next(new AppError("Failed to process refund", 500));
//     }
//   },
// );

export const releaseFundsToSeller = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);
    const payment = await Payment.findOne({ orderId });

    const seller = await User.findById(order.sellerId);

    if (
      !order ||
      !order.paymentStatus ||
      payment?.status !== "held_in_escrow"
    ) {
      return next(new AppError("Order or payment not found", 404));
    }

    const payload = {
      source: "balance",
      amount: payment.amount,
      recipient: seller.sellerAcctInfo.subaccount as string, // You must create a recipient first using the subaccount details
      reason: `Payment for Order #${payment.paymentReference}`,
      reference: `PAYOUT_${payment.paymentReference}`,
      currency: "NGN",
      sellerId: seller._id,
    };

    try {
      // Release payment through payment gateway
      const success = await paystack.releasePayment(payload);
      if (!success) {
        return next(new AppError("Failed to release payment", 500));
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
      console.error("Error releasing payment:", error);
      return next(new AppError("Failed to release payment", 500));
    }
  },
);

// export const releasePayment = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const orderId = req.params?.id;
//       const userId = req.user?.id; // Assuming user info is attached by auth middleware

//       const order = await Order.findById(orderId);

//       if (!order) {
//         throw new AppError("Order not found", 404);
//       }

//       if (order.buyer.toString() !== userId) {
//         throw new AppError("Not authorized to release payment", 403);
//       }

//       const payment = await Payment.findOne({ order: orderId });

//       if (!payment) {
//         throw new AppError("Payment not found", 404);
//       }

//       const success = await paystackService.releaseEscrowPayment(
//         payment.escrowId,
//       );

//       if (!success) {
//         throw new AppError("Failed to release payment", 400);
//       }

//       // Update payment and order status
//       await Payment.findByIdAndUpdate(payment._id, {
//         status: "released",
//         releasedAt: new Date(),
//       });

//       await Order.findByIdAndUpdate(orderId, {
//         paymentStatus: "released",
//       });
//     } catch (error) {
//       console.error("Error releasing payment:", error);
//       return next(new AppError("Failed to release payment", 500));
//     }
//   },
// );
