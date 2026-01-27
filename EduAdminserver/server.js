import "dotenv/config";
import express, { json } from "express";
import connectDb from "./utils/dbConnection.js";
import cookieParser from "cookie-parser";
import authController from "./controllers/authController.js";
import userRouter from "./routes/userRouter.js";
import courseRouter from "./routes/courseRouter.js";
import rbacController from "./controllers/rbacController.js";
import adminRouter from "./routes/adminRouter.js";

const app = express();
const port = 4000;

app.use(cookieParser());
app.use(json());

app.use("/user", userRouter);
app.use("/course", authController, courseRouter);
app.use("/admin", authController, rbacController("admin"), adminRouter);

// errorHandler
app.use((err, req, res, next) => {
  console.log(err);
  if (err.code === 11000) {
    res.status(401);
    if (err.keyPattern.username) {
      res.send(
        "This username is already in use, Please use a different username"
      );
    }
    if (err.keyPattern.userId && err.keyPattern.courseId) {
      res.send("You've already purchased this course!!!");
    }
  }
  console.error(err.stack);
  res.status(err.status || 500).send({ error: err.message });
});

// RBAC - Role Based Access Control
//app.use("/admin",authController ,adminRouter);

connectDb().then((e) => {
  console.log("connect db");

  app.listen(port, (e) => {
    if (e) console.error("could not run server", e);
    else console.log(`Example app listening on port :${port}`)
  })
});