const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Hereglegchiin neriig zaaval oruulna uu!"],
  },
  email: {
    type: String,

    unique: true,
  },
  password: String,
  role: {
    type: String,
    enum: ["User", "Admin"],
    default: "User",
  },
  phone: Number,
  profileImg: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
const user = mongoose.model("User", UserSchema, "Users");

module.exports = user;
