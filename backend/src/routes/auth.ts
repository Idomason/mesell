import express from "express";
import { User } from "../models/User.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.create({ email, password });
  res.status(201).json(user);
});

export default router;
