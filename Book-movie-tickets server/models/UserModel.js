import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: String,
  role: { type: String, enum: ["admin", "user"], default: "user" },
  secret: String,
});

userSchema.statics.findUser = async (username) => {
  const userData = (await UserModel.findOne({ username }))?.toObject();
  return userData;
};

userSchema.statics.createUser = async (userdata) => {
  console.log("Create user called", userdata);
  const userData = await UserModel.create(userdata);
  return userData;
};

const UserModel = mongoose.model("User", userSchema);

export default UserModel;