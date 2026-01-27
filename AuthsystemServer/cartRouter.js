import { Router } from "express";
import authController from "./authController.js";
const cartRouter = Router();

cartRouter.post("/add", authController, (req, res) => {
  const user = res.locals.user;
  user.cart.push({ id: 101, price: 120000, name: "Smartphone" });
  res.send({ message: "Product added to cart successfully", cart: user.cart });
});

export default cartRouter;