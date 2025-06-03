// csrfMiddleware.js
function verifyCsrfToken(req, res, next) {
  const tokenFromHeader = req.headers["x-csrf-token"];
  // 假設 JWT payload 內有 csrfToken 欄位
  const tokenFromJwt = req.user && req.user.csrfToken;
  if (!tokenFromHeader || tokenFromHeader !== tokenFromJwt) {
    return res.status(403).json({ error: "CSRF 驗證失敗" });
  }

  next();
}

export default verifyCsrfToken;
