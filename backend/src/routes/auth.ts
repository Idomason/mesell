import express from "express";
import { User } from "../models/User.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.create({ email, password });
  res.status(201).json(user);
});

/* 

POST /api/auth/login -> returns access token and sets refresh token as HttpOnly cookie

POST /api/auth/refresh -> exchange refresh cookie for new access token

POST /api/auth/logout -> clear refresh cookie

*/

export default router;
