const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String, required: true },
    pic: {
      type: String,
      required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    role: {
      type: String,
      enum: ["admin", "pharmacist", "patient"], // Define allowed values for the 'role' field
      default: "patient",
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true } // Corrected 'timestamps' spelling
);

const User = mongoose.model("User", userSchema);

module.exports = User;
