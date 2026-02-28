import path from "node:path";

import cors from "cors";
import morgan from "morgan";
import express from "express";
import * as dotenv from "dotenv";

import authRoutes from "@/routes/auth.js";
import orderRoutes from "@/routes/orders.js";
import userRoutes from "@/routes/userRoutes.js";
import productRoutes from "@/routes/products.js";
import paymentRoutes from "@/routes/payments.js";
import { globalErrorHandler } from "@/middleware/errorHandler.js";
import { notFoundHandler } from "@/middleware/notFoundHandler.js";

dotenv.config({ path: ".env" });

const app = express();

// Global middleware checking how long it takes for a request to be complete
app.use((req, res, next) => {
  const start = Date.now();
  next();
  const end = start - Date.now();
  console.log(`${req.method}: ${req.url}/ ${end} ms`);
});

// Middlewares
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/payments", paymentRoutes);
app.use("/api/v1/users", userRoutes);

app.get("/", (req, res) => {
  res.send(path.join(__dirname, "..", "public", "index.html"));
});

// Error handling
app.use(notFoundHandler);
app.use(globalErrorHandler);

export default app;
