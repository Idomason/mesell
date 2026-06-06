import express from "express";
import { Product } from "../../models/ProductModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await Product.find({});
  console.log(products);
  res.status(200).json({ data: { products } });
});

/*
  GET /api/products (pagination, filters)

  GET /api/products/:slug
*/

export default router;
