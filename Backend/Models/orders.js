const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
  {
    orderDate: Date,
    pID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient", // Reference to the Patient model
      required: true,
    },
    cart: [
      {
        medicineID:{
          type: mongoose.Schema.Types.ObjectId,
          ref: "Medicine",
        },
        amount: Number,
      }
    ],
    status: {
      type: String,
      enum: ["undelivered", "delivered"], 
      default: "undelivered",
    },
    payment: {
      type: String,
      enum: ["Cash On Delivery", "Credit Card", "Wallet"], 
    },
    address: String,
  }
);
module.exports = mongoose.model("Order", orderSchema);