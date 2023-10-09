const mongoose = require("mongoose");
const prescriptionSchema = new mongoose.Schema(
  {
    medID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Medicine", // Reference to the Medicine model
      required: true,
    },
    patientID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient", // Reference to the Doctor model
      required: true,
    },
    doctorID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor", // Reference to the Doctor model
      required: true,
    },
    datePrescribed: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["filled", "unfilled"], // Define allowed values for status
      default: "unfilled",
    },
  },
);
module.exports = mongoose.model("Prescription", prescriptionSchema);
