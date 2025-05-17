import express from "express";
import { senderMessage } from "../servers/sender.js";

const router = express.Router();

router.post("/send", async (req, res) => {
  const message = req.body.message;
  if (!message) {
    return res.status(400).send("請提供要發送的資料");
  }
  try {
    const bufferMessage = Buffer.from(message);
    const result = await senderMessage(bufferMessage);
    res.send(result.success);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default router;
