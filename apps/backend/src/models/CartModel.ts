import mongoose, { HydratedDocument, Schema, Types } from "mongoose";

export interface Seller {
  id: Types.ObjectId | string;
  name: string;
  verified: boolean;
  isLive: boolean;
}

export type CartItem = {
  productId: Types.ObjectId | string;
  images: string[];
  heading: string;
  color?: string;
  size: string;
  price: number;
  quantity: number;
  name: string;
  description: string;
  totalSold: number;
  isLive: boolean;
  seller: Seller;
  category: string;
};

export type Cart = {
  userId: Types.ObjectId;
  items: CartItem[];
  coupon: { code: string; discountAmount: number };
  subtotal: number;
  total: number;
  currency: string;
};

export type CartDocument = HydratedDocument<Cart>;

const cartSchema = new mongoose.Schema<Cart>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        sku: String,
        quantity: { type: Number, required: true, min: 1 },
        priceAtAdd: { type: Number, required: true, min: 0 },
        images: [String],
        heading: String,
        color: String,
        size: String,
        price: Number,
        name: String,
        description: String,
        totalSold: Number,
        isLive: Boolean,
        seller: {
          id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
          name: String,
          verified: Boolean,
          isLive: Boolean,
        },
        category: String,
      },
    ],
    coupon: { code: String, discountAmount: Number },
    subtotal: Number,
    total: Number,
    currency: { type: String, default: "NGN" },
  },
  { timestamps: true },
);

export const Cart = mongoose.model<CartDocument>("Cart", cartSchema);
