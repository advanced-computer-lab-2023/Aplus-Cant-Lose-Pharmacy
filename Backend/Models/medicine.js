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
    }

  }
);

module.exports = mongoose.model("Medicine", medicineSchema);
