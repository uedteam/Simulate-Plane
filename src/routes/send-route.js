import express from "express";
import { sendMessage } from "../controllers/sendController.js";

/**
 * @swagger
 * /api/v1/send:
 *   post:
 *     summary: 發送訊息到 UDP
 *     description: 將訊息透過 UDP 發送到指定主機
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 description: 要發送的訊息內容
 *     responses:
 *       200:
 *         description: 發送成功
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: 資料已發送
 *       400:
 *         description: 請提供要發送的資料
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: 請提供要發送的資料
 *       500:
 *         description: 伺服器錯誤
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: 傳送錯誤
 */

const router = express.Router();

router.post("/send", sendMessage);

export default router;
