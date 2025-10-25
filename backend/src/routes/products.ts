import express from "express";
import { Product } from "../models/Product.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await Product.find();
  res.status(200).json(products);
});

export default router;
