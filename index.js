import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { startReceiver } from "./src/servers/receiver.js";
import sendRoute from "./src/routes/send-route.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});

const app = express();
const port = process.env.PORT || 3000;

// 提供靜態資源
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// 掛載 send 路由
app.use(sendRoute);

// 設定首頁路由
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// 處理 404 錯誤
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});

// 啟動 Express 伺服器
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// 啟動接收器
startReceiver();
