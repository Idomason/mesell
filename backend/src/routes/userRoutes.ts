import express from "express";
import * as authController from "@/controllers/authController.js";
import { protect } from "@/middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/sign-up", authController.signup);
userRouter.post("/sign-in", authController.login);

userRouter.post("/forgot-password", authController.forgotPassword);
userRouter.post("/reset-password/:token", authController.resetPassword);

export default userRouter;
