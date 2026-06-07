import express from "express";
import { Order } from "../models/OrderModel.js";
import { protect } from "../middleware/auth.js";
import { createCheckout } from "@/controllers/createCheckout.js";

const router = express.Router();

router.post("/", protect, createCheckout);

export default router;
