const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    phonenumber: { type: String, required: true, unique: true },
  },
  { collection: "user-data" },
  { timestamps: true }
);
module.exports = mongoose.model("UserData", User);
