const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema(
  {
    activeElement: String,
    price: Number,
    use: String,
    name: String,
    amount: Number,
    imgurl: String,
    sales:{
      type:Number,
      default: 0,
    },
    type: {
      type: String,
      enum: ["Prescription", "Over the counter"], // Define allowed values for status
      default: "Over the counter",
    },
  }
);

module.exports = mongoose.model("Medicine", medicineSchema);
