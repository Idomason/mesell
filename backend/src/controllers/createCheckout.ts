import { AppError } from "@/middleware/errorHandler";
import { Order } from "@/models/OrderModel";
import { Payment } from "@/models/PaymentModel";
import { PaystackService } from "@/services/paystack-test";
import { catchAsync } from "@/utils/catchAsync";
import type { Request, Response, NextFunction } from "express";

const paystack = PaystackService.create();

export const createCheckout = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("Checkout request body:", req.body);

    // req.body is an array of cart items
    const orderItems = Array.isArray(req.body) ? req.body : [req.body];

    if (orderItems.length === 0) {
      return next(new AppError("No items in cart", 400));
    }

    // TODO: Extract buyer from auth middleware
    const buyerId = req.user?.id;

    if (!buyerId) {
      return next(new AppError("User not authenticated", 401));
    }

    // Create orders for each cart item
    const createdOrders = [];
    let totalCheckoutAmount = 0;

    for (const item of orderItems) {
      if (!item.seller?.id || !item.quantity || !item.totalPrice) {
        return next(
          new AppError(
            "All items must have seller, quantity, and totalPrice",
            400,
          ),
        );
      }

      const order = await Order.create({
        buyer: buyerId,
        seller: item.seller.id,
        product: item.id, // Map frontend product id to product field
        quantity: item.quantity,
        totalAmount: item.totalPrice,
        deliveryAddress: item.deliveryAddress,
        paymentStatus: "pending",
        deliveryStatus: "pending",
      });

      createdOrders.push(order);
      totalCheckoutAmount += item.totalPrice;
    }

    // Prepare payment initialization data
    const initPaymentData = {
      email: req.user?.email || "buyer.jane@gmail.com", // TODO: Use actual user email
      amount: Math.round(totalCheckoutAmount * 100), // Paystack expects amount in kobo
      orderId: createdOrders[0]._id.toString(),
      subaccount: "ACCT_xo0m6r5j916qsep", // TODO: Make dynamic based on seller
      metadata: {
        orderIds: createdOrders.map((o) => o._id.toString()),
        itemCount: createdOrders.length,
        shippingAddress: createdOrders[0].deliveryAddress,
        paymentTrigger: "web_checkout",
      },
    };

    try {
      const paymentData = await paystack.initializePayment(initPaymentData);

      // Create payment record
      await Payment.create({
        order: createdOrders[0]._id,
        amount: totalCheckoutAmount,
        currency: "NGN",
        paymentMethod: "card",
        paymentReference: paymentData.reference,
        authorizationUrl: paymentData.authorizationUrl,
        status: "pending",
        metadata: {
          orderIds: createdOrders.map((o) => o._id.toString()),
          itemCount: createdOrders.length,
        },
      });

      res.status(200).json({
        status: "success",
        data: {
          authorizationUrl: paymentData.authorizationUrl,
          reference: paymentData.reference,
          orders: createdOrders.map((o) => o._id),
        },
      });
    } catch (error) {
      // Clean up created orders if payment initialization fails
      await Order.deleteMany({ _id: { $in: createdOrders.map((o) => o._id) } });
      throw error;
    }
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

// export const releasePayment = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const { orderId } = req.params;

//     try {
//       const order = await Order.findById(orderId).populate("payment");
//       if (!order || !order.payment) {
//         return next(new AppError("Order or payment not found", 404));
//       }

//       const payment = order.payment as PaymentDocument;

//       // Release payment through payment gateway
//       const success = await paymentService.releasePayment(payment.transactionId);
//       if (!success) {
//         return next(new AppError("Failed to release payment", 500));
//       }

//       // Update payment and order status
//       await Payment.findByIdAndUpdate(payment._id, {
//         status: "released",
//         releasedAt: new Date(),
//       });

//       await Order.findByIdAndUpdate(orderId, {
//         paymentStatus: "released",
//       });

//       res.status(200).json({
//         status: "success",
//         message: "Payment released successfully",
//       });
//     } catch (error) {
//       console.error("Error releasing payment:", error);
//       return next(new AppError("Failed to release payment", 500));
//     }
//   },
// );

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

// export const verifyPayment = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const reference = req.params?.reference;

//       const paymentInfo = await paystackService.verifyPayment(reference);

//       if (!paymentInfo) {
//         throw new AppError("Payment verification failed", 400);
//       }

//       // Update payment and order status based on verification result
//       await Payment.findOneAndUpdate(
//         { transactionId: reference },
//         {
//           status: "paid",
//           paidAt: new Date(),
//           paymentDetails: paymentInfo,
//         },
//       );
//       const payment = await Payment.findOne({ transactionId: reference });
//       if (!payment) {
//         throw new AppError("Payment not found", 404);
//       }

//       await Order.findByIdAndUpdate(payment.order, {
//         paymentStatus: "paid",
//       });

//       res.status(200).json({
//         status: "success",
//         message: "Payment verified successfully",
//       });
//     } catch (error) {
//       console.error("Error verifying payment:", error);
//       return next(new AppError("Failed to verify payment", 500));
//     }
//   },
// );
