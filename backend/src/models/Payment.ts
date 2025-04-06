import mongoose, { Document, Schema } from "mongoose";

export interface IPayment extends Document {
  order: mongoose.Types.ObjectId;
  amount: number;
  currency: string;
  paymentMethod: "card" | "ussd" | "pos";
  paymentReference: string;
  escrowId: string;
  status: "pending" | "success" | "failed" | "refunded" | "released";
  metadata: {
    bank?: string;
    accountNumber?: string;
    accountName?: string;
    bvn?: string;
    cardLast4?: string;
    cardBrand?: string;
  };
  webhookData?: Record<string, any>;
  refundReason?: string;
  refundedAt?: Date;
  releasedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const paymentSchema = new Schema<IPayment>(
  {
    order: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: [true, "Payment must be associated with an order"],
    },
    amount: {
      type: Number,
      required: [true, "Please provide payment amount"],
      min: 0,
    },
    currency: {
      type: String,
      required: [true, "Please provide payment currency"],
      default: "NGN",
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
    status: {
      type: String,
      enum: ["pending", "success", "failed", "refunded", "released"],
      default: "pending",
    },
    metadata: {
      bank: String,
      accountNumber: String,
      accountName: String,
      bvn: String,
      cardLast4: String,
      cardBrand: String,
    },
    webhookData: {
      type: Map,
      of: Schema.Types.Mixed,
    },
    refundReason: String,
    refundedAt: Date,
    releasedAt: Date,
  },
  {
    timestamps: true,
  }
);

// Index for order payments
paymentSchema.index({ order: 1 });

// Index for payment status
paymentSchema.index({ status: 1 });

// Index for payment reference
paymentSchema.index({ paymentReference: 1 }, { unique: true });

// Index for escrow ID
paymentSchema.index({ escrowId: 1 }, { unique: true });

export const Payment = mongoose.model<IPayment>("Payment", paymentSchema);
