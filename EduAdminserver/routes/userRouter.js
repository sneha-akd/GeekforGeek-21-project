import { Router } from "express";
import { signup, login, logout, resetPassword } from "../controllers/userController";
const userRouter = Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);

userRouter.patch("/reset-password", resetPassword);
userRouter.get("/logout", logout);

export default userRouter;