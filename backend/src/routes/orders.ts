import express from "express";
import { Order } from "../models/OrderModel.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/", protect, async (req, res) => {
  console.log(req.body);

  // req.body is an array of cart items from frontend
  const orderItems = Array.isArray(req.body) ? req.body : [req.body];

  const buyerId = req.user?.id; // User attached by auth middleware

  if (!buyerId) {
    return res.status(401).json({ error: "User not authenticated" });
  }

  const createdOrders = [];

  for (const item of orderItems) {
    const order = new Order({
      buyer: buyerId,
      seller: item.seller?.id || item.seller, // Handle both object and ID
      product: item.id, // Map frontend product id to product field
      quantity: item.quantity,
      totalAmount: item.totalPrice || item.price * item.quantity,
      deliveryAddress: item.deliveryAddress,
      paymentStatus: "pending",
      deliveryStatus: "pending",
    });

    await order.save();
    createdOrders.push(order);
  }

  res.status(201).json({
    status: "success",
    data: createdOrders,
  });
});

export default router;
