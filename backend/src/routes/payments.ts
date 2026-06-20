import express from "express";
import {
  initializePayment,
  releasePayment,
  refundPayment,
  // initializeCheckoutPayment,
  createSellerEscrowAccount,
} from "../controllers/paymentController.js";
import { protect } from "../middleware/auth.js";
import { verifyPayment } from "@/controllers/checkoutController.js";

const router = express.Router();

// Create seller account - Paystack subaacount (protected)
router.post("/create", protect, createSellerEscrowAccount);

// Buyer make payment at checkout
// router.route("/pay").post(protect, initializeCheckoutPayment);

// Initialize payment
// router.post("/initialize/", initializePayment);

// Verify payment
router.get("/verify", verifyPayment);

// Release payment (buyer confirms delivery)
router.post("/release/:orderId", protect, releasePayment);

// Refund payment (buyer requests refund)
router.post("/refund/:orderId", protect, refundPayment);

export default router;
