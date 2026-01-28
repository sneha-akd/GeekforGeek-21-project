import { verifyToken } from "../utils/jwtUtil.js";

const authController = (req, res, next) => {
  const { authToken } = req.cookies;
  const userData = verifyToken(authToken);
  // res.local placeholder to store data between middlewares
  res.locals.user = userData;
  next();
};

export default authController;