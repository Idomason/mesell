import mongoose, { Schema } from "mongoose";

export interface IProduct {
  sellerId: mongoose.Types.ObjectId;
  name: string;
  description: string;
  price: number;
  preOrderPrice: number;
  category: string;
  quantity: number;
  images: string[];
  color: string;
  size: string;
  slug: { type: String; unique: Boolean };
  specifications: Record<string, string>;
  estimatedDeliveryDate: Date;
  minimumOrders: number;
  currentOrders: number;
  stock: { type: Number; default: 0 };
  currency: { type: String; default: "USD" };
  status: "active" | "inactive" | "sold_out";
  variants: [{ name: String; sku: String; price: Number; stock: Number }];
  rating: number;
  brand: { type: String; required: Boolean };
  reviews: Array<{
    user: mongoose.Types.ObjectId;
    rating: number;
    comment: string;
    isVerifiedPurchase: boolean;
    createdAt: Date;
  }>;
  liveStreamUrl?: string;
  liveStreamScheduled?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Product must belong to a seller"],
    },
    name: {
      type: String,
      required: [true, "Please provide product name"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please provide product description"],
    },
    price: {
      type: Number,
      required: [true, "Please provide product price"],
      min: 0,
    },
    preOrderPrice: {
      type: Number,
      required: [true, "Please provide pre-order price"],
      min: 0,
    },
    category: {
      type: String,
      required: [true, "Please provide product category"],
      enum: [
        "children",
        "shoes",
        "dress",
        "clothes",
        "home",
        "men",
        "women",
        "kitchen",
        "Room Decor",
        "Wood Work",
      ],
    },
    quantity: { type: Number, default: 1 },
    brand: { type: String, required: true, trim: true },
    stock: { type: Number, required: [true, "Stock is required"], min: 0 },
    images: [
      {
        type: String,
        required: [true, "Please provide at least one product image"],
      },
    ],
    color: { type: String, trim: true },
    size: { type: String, trim: true },
    specifications: {
      type: Map,
      of: String,
      required: [true, "Please provide product specifications"],
    },
    estimatedDeliveryDate: {
      type: Date,
      required: [true, "Please provide estimated delivery date"],
    },
    minimumOrders: {
      type: Number,
      required: [true, "Please provide minimum orders required"],
      min: 1,
    },
    currentOrders: {
      type: Number,
      default: 0,
      min: 0,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "sold_out"],
      default: "active",
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviews: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        rating: {
          type: Number,
          required: true,
          min: 1,
          max: 5,
        },
        comment: {
          type: String,
          required: true,
        },
        isVerifiedPurchase: {
          type: Boolean,
          default: false,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    liveStreamUrl: {
      type: String,
      trim: true,
    },
    liveStreamScheduled: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

// Index for text search
productSchema.index({ name: "text", description: "text" });

// Index for category filtering
productSchema.index({ category: 1 });

// Index for seller filtering
productSchema.index({ seller: 1 });

export const Product = mongoose.model<IProduct>("Product", productSchema);
