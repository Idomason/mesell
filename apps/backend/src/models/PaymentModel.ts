import mongoose, { Document, Schema } from "mongoose";

export interface IPayment extends Document {
  orderId: mongoose.Types.ObjectId;
  amount: number;
  currency: string;
  paymentMethod: "card" | "ussd" | "pos";
  paymentReference: string;
  authorizationUrl: string;
  status:
    | "pending"
    | "paid"
    | "failed"
    | "refunded"
    | "released"
    | "held_in_escrow";
  metadata: {
    orderId: string;
    sellerIds: string[];
    itemCount: number;
    sellerCount: number;
    bank?: string;
    accountNumber?: string;
    accountName?: string;
    bvn?: string;
    cardLast4?: string;
    cardBrand?: string;
    transactionId: string;
    channel: string;
    fees: number;
    paidAt: Date;
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
    orderId: {
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
    authorizationUrl: {
      type: String,
      required: [true, "Payment authorization url is required"],
    },
    status: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded", "released"],
      default: "pending",
    },
    metadata: {
      orderId: String,
      itemCount: Number,
      sellerCount: Number,
      sellerIds: [String],
      bank: String,
      accountNumber: String,
      accountName: String,
      bvn: String,
      cardLast4: String,
      cardBrand: String,
      transactionId: String,
      channel: String,
      fees: Number,
      paid: Date,
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
  },
);

// Index for order payments
paymentSchema.index({ order: 1 });

// Index for payment status
paymentSchema.index({ status: 1 });

// Index for payment reference
paymentSchema.index({ paymentReference: 1 }, { unique: true });

export const Payment = mongoose.model<IPayment>("Payment", paymentSchema);
