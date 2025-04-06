import express from "express";
import {
  initializePayment,
  verifyPayment,
  releasePayment,
  refundPayment,
} from "../controllers/paymentController";
import { protect } from "../middleware/auth";

const router = express.Router();

// Initialize payment
router.post("/initialize/:orderId", protect, initializePayment);

// Verify payment
router.get("/verify/:reference", verifyPayment);

// Release payment (buyer confirms delivery)
router.post("/release/:orderId", protect, releasePayment);

// Refund payment (buyer requests refund)
router.post("/refund/:orderId", protect, refundPayment);

export default router;
