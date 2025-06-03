export const attachTokenMiddleware = (req, res, next) => {
  const accessToken = req.cookies?.accessToken;

  if (accessToken) {
    req.headers["authorization"] = `Bearer ${accessToken}`;
  }

  next();
};
