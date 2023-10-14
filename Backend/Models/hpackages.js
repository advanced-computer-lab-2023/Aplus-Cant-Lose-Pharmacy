const mongoose = require("mongoose");
const packSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    unique: true,
  },
  rate: {
    type: Number,
    required: true,
  },
  doctorDisc: {
    type: Number,
    required: true,
  },
  medicineDisc: {
    type: Number,
    required: true,
  },
  familyDisc: {
    type: Number,
    required: true,
  },
});


module.exports = mongoose.model("HPackages", packSchema);