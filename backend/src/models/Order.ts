import mongoose, { Document, Schema } from "mongoose";

export interface IOrder extends Document {
  buyer: mongoose.Types.ObjectId;
  seller: mongoose.Types.ObjectId;
  product: mongoose.Types.ObjectId;
  quantity: number;
  totalAmount: number;
  paymentStatus: "pending" | "paid" | "refunded" | "released";
  paymentMethod: "card" | "ussd" | "pos";
  paymentReference: string;
  escrowId: string;
  deliveryStatus:
    | "pending"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";
  trackingNumber?: string;
  deliveryProvider?: "max" | "gig";
  deliveryAddress: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  deliveryConfirmation?: {
    confirmedBy: mongoose.Types.ObjectId;
    confirmedAt: Date;
    images?: string[];
  };
  dispute?: {
    status: "open" | "resolved" | "closed";
    reason: string;
    description: string;
    openedBy: mongoose.Types.ObjectId;
    openedAt: Date;
    resolvedAt?: Date;
    resolution?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    buyer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Order must belong to a buyer"],
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Order must belong to a seller"],
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Order must contain a product"],
    },
    quantity: {
      type: Number,
      required: [true, "Please provide order quantity"],
      min: 1,
    },
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
      required: [true, "Please provide payment method"],
    },
    paymentReference: {
      type: String,
      required: [true, "Please provide payment reference"],
    },
    escrowId: {
      type: String,
      required: [true, "Please provide escrow ID"],
    },
    deliveryStatus: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    trackingNumber: {
      type: String,
      trim: true,
    },
    deliveryProvider: {
      type: String,
      enum: ["max", "gig"],
    },
    deliveryAddress: {
      street: {
        type: String,
        required: [true, "Please provide delivery street address"],
      },
      city: {
        type: String,
        required: [true, "Please provide delivery city"],
      },
      state: {
        type: String,
        required: [true, "Please provide delivery state"],
      },
      country: {
        type: String,
        required: [true, "Please provide delivery country"],
        default: "Nigeria",
      },
      postalCode: {
        type: String,
        required: [true, "Please provide delivery postal code"],
      },
    },
    deliveryConfirmation: {
      confirmedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      confirmedAt: Date,
      images: [String],
    },
    dispute: {
      status: {
        type: String,
        enum: ["open", "resolved", "closed"],
      },
      reason: String,
      description: String,
      openedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      openedAt: Date,
      resolvedAt: Date,
      resolution: String,
    },
  },
  {
    timestamps: true,
  }
);

// Index for buyer orders
orderSchema.index({ buyer: 1 });

// Index for seller orders
orderSchema.index({ seller: 1 });

// Index for payment status
orderSchema.index({ paymentStatus: 1 });

// Index for delivery status
orderSchema.index({ deliveryStatus: 1 });

export const Order = mongoose.model<IOrder>("Order", orderSchema);
