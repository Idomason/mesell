import express from "express";
import {
  initializePayment,
  verifyPayment,
  releasePayment,
  refundPayment,
  // initializeCheckoutPayment,
  createSellerEscrowAccount,
} from "../controllers/paymentController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Create seller account - Paystack subaacount
router.post("/create", createSellerEscrowAccount);

// Buyer make payment at checkout
// router.route("/pay").post(protect, initializeCheckoutPayment);

// Initialize payment
// router.post("/initialize/", initializePayment);

// Verify payment
router.get("/verify/:reference", verifyPayment);

// Release payment (buyer confirms delivery)
router.post("/release/:orderId", protect, releasePayment);

// Refund payment (buyer requests refund)
router.post("/refund/:orderId", protect, refundPayment);

export default router;
