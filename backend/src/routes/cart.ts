import express from "express";
import { protect } from "../middleware/auth.js";
import {
  createCartItem,
  deleteCartItem,
  getCartItems,
  mergeCart,
} from "@/controllers/cartController.js";

const router = express.Router();

router.route("/").get(getCartItems).post(createCartItem);

router.post("/merge", mergeCart);

router.delete("/item/:itemId", deleteCartItem);

export default router;
