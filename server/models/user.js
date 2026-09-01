import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  password: String,
  role: { type: String, default: "farmer" }
});

export default mongoose.model("User", userSchema);