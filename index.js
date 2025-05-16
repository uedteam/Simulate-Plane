import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import dgram from "dgram";
import { startReceiver } from "./src/server/receiver.js";
import { startSender } from "./src/server/sender.js";

const TARGET_PORT = process.env.SENDER_PORT;
const TARGET_HOST = process.env.SENDER_HOST;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// 提供靜態資源
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

const socket = dgram.createSocket("udp4");

app.post("/send", (req, res) => {
  const message = req.body.message; // 假設你從請求中獲取要發送的資料

  if (!message) {
    return res.status(400).send("請提供要發送的資料");
  }
  const bufferMessage = Buffer.from(message);
  socket.send(
    bufferMessage,
    0,
    bufferMessage.length,
    TARGET_PORT,
    TARGET_HOST,
    (err) => {
      if (err) {
        console.error("傳送錯誤：", err);
        res.status(500).send("傳送錯誤");
      } else {
        console.log("已發送：", message.toString());
        res.send("資料已發送");
      }
    },
  );
});

// 所有非 API 的路由都導向 index.html（SPA 模式）
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// 啟動發送器
// startSender();
// 啟動接收器
startReceiver();
