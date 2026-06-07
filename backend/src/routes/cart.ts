import express from "express";
import { Cart } from "../models/CartModel.js";
import { protect } from "../middleware/auth.js";
import {
  createCartItem,
  deleteCartItem,
  getCartItems,
  mergeCart,
} from "@/controllers/cartController.js";

const router = express.Router();

router.route("/").get(protect, getCartItems).post(protect, createCartItem);

router.post("/merge", protect, mergeCart);

router.delete("/item/:itemId", protect, deleteCartItem);

export default router;
