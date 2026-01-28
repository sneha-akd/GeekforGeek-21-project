import mongoose from "mongoose";
const DB_URL = process.env.DB_URL;

const connectDb = async () => {
  try {
    await mongoose.connect(DB_URL)
    console.log("connection success to DB")
  } catch (error) {
    console.log("database connection failed", error)
    process.exit(0)
  }
}

export default connectDb;
