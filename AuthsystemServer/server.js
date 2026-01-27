import express, { json } from "express";
import router from "./router.js"
import cookieParser from "cookie-parser";
import cartRouter from "./cartRouter.js";

const app = express();
const port = 4000;

app.use(cookieParser());
app.use(json());

app.use("/user", router);
app.use("/cart", cartRouter);

// RBAC - Role Based Access Control
//app.use("/admin",authController ,adminRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));