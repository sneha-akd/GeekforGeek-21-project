import { Router } from "express";
import authController from "./authController.js";
const cartRouter = Router();

const userDetails = [
  {
    username: "nikhil101",
    name: "Nikhil",
    email: "test@gmail.com",
    password: "$2b$10$cJcfjvJeMGNgGVP.xpk/PeWIbl4gGycI.ehE3ZNlMmOYl.ArFczHe",
    cart: [],
  },
];

cartRouter.post("/add", authController, (req, res) => {
  const user = res.locals.user;
  user.cart.push({ id: 101, price: 120000, name: "Smartphone" });
  res.send({ message: "Product added to cart successfully", cart: user.cart });
});

export default cartRouter;