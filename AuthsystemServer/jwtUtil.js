import jwt from "jsonwebtoken";

const SECRET_KEY = "MY_SECRET_KEY";

export const generateToken = (userdata, time = "1h") => {
  const token = jwt.sign(userdata, SECRET_KEY, { expiresIn: time });
  return token;
};

export const verifyToken = (token) => {
  if (!token) {
    throw new Error("Token is required for verification");
  }
  const decoded = jwt.verify(token, SECRET_KEY);
  return decoded;
};
