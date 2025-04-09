import express from "express";
import { Order } from "../models/Order";

const router = express.Router();

router.post("/", async (req, res) => {
  const { productId, quantity } = req.body;
  const order = await Order.create({ productId, quantity });
  res.status(201).json(order);
});

export default router;
