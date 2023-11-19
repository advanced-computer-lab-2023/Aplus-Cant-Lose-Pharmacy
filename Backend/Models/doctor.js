const mongoose = require("mongoose");

const drSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    speciality: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    Dbirth: Date,
    gender: {
      type: String,
      enum: ["male", "female", "none"],
      default: "none",
      required: true,
    },
    rate: {
      type: Number,
      required: true,
    },
    affilation: {
      type: String,
      required: true,
    },
    background: {
      type: String,
      required: true,
    },
    docs: [
      {
        url: String,
        desc: String,
      },
    ],
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
    wallet: {
      type: Number,
    },
    contract: {
      file: String, // assuming you store the file path, adjust as needed
      accepted: {
        type: Boolean,
        default: false,
      },
    },
  }
);

drSchema.statics.findByUsername = async function (username) {
  return this.find({ username });
};

module.exports = mongoose.model("Doctor", drSchema);
