import { CreateOrderInput } from "../../../../packages/shared/src";
import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema<CreateOrderInput>(
  {
    buyerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Order must belong to a buyer"],
    },
    email: { type: String, unique: true, trim: true, lowercase: true },
    items: {
      type: [
        {
          productId: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: [true, "Order item must contain a product"],
          },
          sellerId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Order item must belong to a seller"],
          },
          quantity: {
            type: Number,
            required: [true, "Please provide order item quantity"],
            min: 1,
          },
          unitPrice: {
            type: Number,
            required: [true, "Please provide order item unit price"],
            min: 0,
          },
          totalPrice: {
            type: Number,
            required: [true, "Please provide order item total price"],
            min: 0,
          },
          payoutAmount: {
            type: Number,
            required: [true, "Please provide an amount payable to the seller"],
          },
          payoutStatus: {
            type: String,
            enum: ["paid", "held", "failed"],
            default: "held",
          },
          deliveryStatus: {
            type: String,
            enum: [
              "pending",
              "processing",
              "shipped",
              "delivered",
              "cancelled",
            ],
            default: "pending",
          },
          refundStatus: {
            type: String,
            enum: ["pending", "requested", "refunded", "rejected"],
            default: "pending",
          },
          refundedAmount: {
            type: Number,
            default: 0,
            min: 0,
          },
          deliveryAddress: {
            street: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            country: { type: String, default: "Nigeria" },
            postalCode: { type: String, required: true },
          },
        },
      ],
      validate: {
        validator: (items: any[]) => Array.isArray(items) && items.length > 0,
        message: "Order must contain at least one item",
      },
    },
    isGuest: { type: Boolean, default: true },
    guestClaimToken: { type: String, unique: true, sparse: true },
    guestClaimTokenExpiry: { type: Date, default: null },
    totalAmount: {
      type: Number,
      required: [true, "Please provide order total amount"],
      min: 0,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "refunded", "released"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["card", "ussd", "pos"],
    },
    paymentReference: { type: String },
    escrowId: { type: String },
    deliveryStatus: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    trackingNumber: { type: String, trim: true },
    deliveryProvider: { type: String, enum: ["max", "gig"] },
    deliveryAddress: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      country: { type: String, default: "Nigeria" },
      postalCode: { type: String },
    },
    deliveryConfirmation: {
      confirmedBy: { type: Schema.Types.ObjectId, ref: "User" },
      confirmedAt: { type: Date },
      images: [{ type: String }],
    },
    dispute: {
      status: { type: String, enum: ["open", "resolved", "closed"] },
      reason: { type: String },
      description: { type: String },
      openedBy: { type: Schema.Types.ObjectId, ref: "User" },
      openedAt: { type: Date },
      resolvedAt: { type: Date },
      resolution: { type: String },
    },
  },
  { timestamps: true },
);

// Indexes for performance
orderSchema.index({ buyer: 1 });
orderSchema.index({ "items.seller": 1 });
orderSchema.index({ paymentStatus: 1 });
orderSchema.index({ deliveryStatus: 1 });
// Compound index for auto-confirmation cron job
orderSchema.index({ "items.deliveryStatus": 1, updatedAt: 1 });

export const Order = mongoose.model<CreateOrderInput>("Order", orderSchema);
