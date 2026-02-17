import mongoose from "mongoose";

// models/Cart.js
const cartSchema = new mongoose.Schema({
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
  currency: String,
  updatedAt: Date,
});

module.exports = mongoose.model("Cart", cartSchema);
