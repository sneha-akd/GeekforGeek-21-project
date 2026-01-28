import express, { json } from "express";
import 'dotenv/config';
import { join } from "path";
import cors from "cors";

import connectDb from "./config/dbConnection.js"
import router from "./routes/routes.js";
import userRouter from "./routes/userRouter.js";
import bookingRouter from "./routes/bookingRouter.js";
import authController from "./controllers/authController.js";
import cookieParser from "cookie-parser";

const app = express();
// const port = 3000;
const port = process.env.PORT || 3000;

app.use(cookieParser());
app.use(json());
const corsURL = process.env.CORS_URL ?? false;

if (corsURL) {
  app.use(cors({
    origin: corsURL,
  }));
}

app.use("/user", userRouter);
app.use("/shows", router);
app.use("/bookings", authController, bookingRouter);
app.use("/", express.static(join(import.meta.dirname, "dist")));

// errorHandler
app.use((err, req, res, next) => {
  console.log(err);
  console.error(err.stack);
  res.status(err.status || 500).send({ error: err.message });
});

connectDb().then((e) => {
  app.listen(port, (e) => {
    if (e) console.error("could not run server", e);
    else console.log(`Example app listening on port :${port}`)
  })
});