import mongoose, { HydratedDocument, model, Schema, Types } from "mongoose";

export interface Seller {
  id: number;
  name: string;
  verified: boolean;
  isLive: boolean;
}

export type CartItem = {
  productId: Types.ObjectId;
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
  coupon: { code: number; discountAmount: number };
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
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        sku: String,
        quantity: Number,
        priceAtAdd: Number,
      },
    ],
    coupon: { code: String, discountAmount: Number },
    subtotal: Number,
    currency: { type: String, default: "NGN" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Cart", cartSchema);
