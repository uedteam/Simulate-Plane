import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export function authenticateToken(req, res, next) {
  // const authHeader = req.headers["authorization"];
  // const token = authHeader && authHeader.split(" ")[1];
  const token =
    req.cookies?.authToken || req.headers["authorization"]?.split(" ")[1];

  console.log(`驗證 token: ${token}`);
  console.log(`JWT secret: ${JWT_SECRET}`);

  if (!token) {
    return res.status(401).json({ error: "未提供驗證 token" });
  }
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Token 驗證失敗" });
    }
    req.user = user;
    next();
  });
}
