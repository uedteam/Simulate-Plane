import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
// 範例帳號密碼，可改為資料庫查詢
const users = [
  { email: "admin@gmail.com", password: "admin123" },
  { email: "user@gmail.com", password: "user123" },
];

export const login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "請提供帳號與密碼" });
  }
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ error: "帳號或密碼錯誤" });
  }
  // 產生 JWT
  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1m" });

  res.json({ token });
};
