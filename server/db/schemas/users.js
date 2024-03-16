import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  id: String,
});

modulr.exports = mongoose.model("User", userSchema);
