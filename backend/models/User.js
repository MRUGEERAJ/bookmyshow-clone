const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  // unique: true on email ensures no duplicate users (Mongoose-level constraint).
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
});

module.exports = mongoose.model("User", userSchema);
