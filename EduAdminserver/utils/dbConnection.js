import { connect } from "mongoose";
const DB_URL = process.env.DB_URL;

connect(DB_URL)
  .then(() => {
    console.log("Connected to DB Successfully!!!");
  })
  .catch((err) => console.error(err));