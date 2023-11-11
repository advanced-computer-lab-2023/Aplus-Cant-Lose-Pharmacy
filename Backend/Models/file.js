const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema(
  {
    files: [
      {
        title: {
          type: String,
          required: true,
          trim: true
        },
        description: {
          type: String,
          required: true,
          trim: true
        },
        file_path: {
          type: String,
          required: true
        },
        file_mimetype: {
          type: String,
          required: true
        }
      }
    ],
    phID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pharmacist", // Reference to the Doctor model
      required: true,
    },
  },
  {
    timestamps: true
  }
);

const File = mongoose.model('File', fileSchema);

module.exports = File;
