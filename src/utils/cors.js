import cors from "cors";

// 自訂 CORS 設定，僅允許特定來源
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:4000",
  "http://localhost:3100",
  "http://localhost:4100",
  "https://your-frontend-domain.com",
];

const corsOptions = {
  origin: function (origin, callback) {
    // 允許無來源（如 Postman）或在白名單內
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("不允許的 CORS 來源: " + origin));
    }
  },
  methods: ["GET", "POST"], // 僅允許必要方法，提升安全性
  allowedHeaders: ["Content-Type", "Authorization", "X-CSRF-Token"],
  credentials: true,
  optionsSuccessStatus: 204, // 預設 204，防止部分瀏覽器 CORS 問題
  maxAge: 86400, // 預檢請求快取一天
};

export default cors(corsOptions);
