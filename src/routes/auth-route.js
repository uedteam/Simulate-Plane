import express from "express";
import { login } from "../controllers/authController.js";

const router = express.Router();

// 登入路由
router.post("/login", login);

export default router;
