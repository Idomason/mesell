import { Router } from "express";
import { protect } from "@/middleware/auth.js";
import { createCheckout } from "@/controllers/checkoutController.js";

const router = Router();

// router.route("/initialize").post(protect, createCheckout);

export default router;
