import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { startReceiver } from "./servers/receiver.js";
import sendRoute from "./routes/send-route.js";
import authRoute from "./routes/auth-route.js";
import YAML from "yamljs";
import swaggerUi from "swagger-ui-express";
import cors from "./utils/cors.js";
import { authenticateToken } from "./middlewares/authMiddleware.js";
import cookieParser from "cookie-parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// 設定 CORS 中介軟體
app.use(cors);

// 使用 cookie-parser 中介軟體
app.use(cookieParser());

// 使用 attachTokenMiddleware 全域
// app.use(attachTokenMiddleware);

// 提供靜態資源
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());

// 掛載登入路由（不需驗證）
app.use("/api/v1", authRoute);

// 例如：保護 /api/v1/send 路由
app.use("/api/v1", authenticateToken);

// 掛載 send 路由
app.use("/api/v1", sendRoute);

// 設定首頁路由
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

// 設定 Swagger
const swaggerDocs = YAML.load("swagger.yaml");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// 處理 404 錯誤
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "../public", "404.html"));
});

// 啟動 Express 伺服器
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// 啟動接收器
startReceiver();
