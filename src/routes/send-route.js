import express from "express";
import { sendMessage } from "../controllers/sendController.js";

const router = express.Router();

router.post("/send", sendMessage);

export default router;
