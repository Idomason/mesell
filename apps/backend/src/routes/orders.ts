import express from "express";
import { Order } from "../models/OrderModel.js";
import { protect } from "../middleware/auth.js";
import { createCheckout } from "@/controllers/checkoutController.js";
import {
  getAllUserOrders,
  getSingleOrder,
} from "@/controllers/orderController.js";

const router = express.Router();

router.post("/", protect, createCheckout);

router.get("/user-orders", protect, getAllUserOrders);

router.get("/:orderId", protect, getSingleOrder);

export default router;
