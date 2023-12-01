const mongoose = require("mongoose");
    // activeElement: String,
      // price: Number,
      // use: String,
      // name: String,
      // amount: Number,
      // imgurl: String,
const phSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // Email is required
    },
    email: {
      type: String,
      required: true, // Email is required
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    dBirth: Date,
    gender: {
      type: String,
      enum: ["male", "female", "none"], // Define allowed values for the 'role' field
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
        url: String, // Store the URL to the uploaded image
        desc: String, // Optional description for the image
      }
    ],
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"], // Define allowed values for the 'role' field
      default: "pending",
    },
    wallet:{
      type: Number,
      default: 0, 
    }
  }
);

phSchema.statics.findByUsername = async function (username) {
  return this.find({ username });
};

module.exports = mongoose.model("Pharmacist", phSchema);
