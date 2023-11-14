const express = require("express");
const router = express.Router(); // Create an instance of the Express router
const archiver = require("archiver");
const multer = require("multer");
const FilePh = require("../Models/filePh");
const Medicine = require("../Models/medicine"); // Adjust the path accordingly
const path = require("path");
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "./files");
    },
    filename(req, file, cb) {
      cb(null, `${new Date().getTime()}_${file.originalname}`);
    },
  }),
  fileFilter(req, file, cb) {
    // Allow any file type
    cb(null, true);
  },
});

router.get("/downloadf/:phId", async (req, res) => {
  try {
    // Find the doctor by ID
    const docs = await FilePh.findOne({ phID: req.params.phId });

    if (!docs) {
      return res.status(404).send("pharmacist not found");
    }

    const archive = archiver("zip", {
      zlib: { level: 9 }, // Compression level (maximum)
    });

    // Set the Content-Type header
    res.set({
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="files.zip"`,
    });

    // Pipe the archive to the response object
    archive.pipe(res);
    console.log(docs);
    docs.files.forEach((file, index) => {
      const fileContent = require("fs").readFileSync(
        path.join(__dirname, "..", file.file_path)
      );
      archive.append(fileContent, {
        name: `${index + 1}_${file.title}${path.extname(file.file_path)}`,
      });
    });

    // Finalize the archive
    archive.finalize();
  } catch (error) {
    console.error(error);
    res.status(500).send("Error while downloading files. Try again later.");
  }
});

// Function to get MIME type based on file extension
function getMimeType(fileExtension) {
  switch (fileExtension.toLowerCase()) {
    case ".png":
      return "image/png";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".pdf":
      return "application/pdf";
    // Add more cases for other file types as needed
    default:
      return "application/octet-stream";
  }
}
router.post(
  "/upload/:id",
  upload.array("files", 3), // Use upload.array to accept multiple files
  async (req, res) => {
    try {
      const files = req.files;

      const fileObjects = files.map((file, index) => ({
        title: index === 0 ? "id" : index === 1 ? "degree" : "license",
        description: "File description", // You can customize this
        file_path: file.path,
        file_mimetype: file.mimetype,
      }));

      await FilePh.create({ files: fileObjects, phID: req.params.id }); // Corrected typo

      res.send("Files uploaded successfully.");
    } catch (error) {
      console.error(error);
      res.status(400).send("Error while uploading files. Try again later.");
    }
  },
  (error, req, res, next) => {
    if (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  }
);
const storage = multer.diskStorage({
  destination: "./",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload2 = multer({
  storage: storage,
}).single("file");

router.post("/upload2", (req, res) => {
  upload2(req, res, (err) => {
    if (err) {
      console.error("Error uploading file:", err);
      res.status(500).send("Error uploading file");
    } else {
      res.send(req.file.filename);
    }
  });
});
const {
  addPharmacist,
  addMedicine,
  updateMedicineDetails,
} = require("../controllers/phController");

router.post("/addPharmacist", addPharmacist);
router.post("/addMedicine", addMedicine);
router.put("/updateMedicineDetails/:id", updateMedicineDetails);

const {
  viewMedicine,
  searchMedicineByName,
  filterMedicineByUse,
} = require("../controllers/userController");
const { title } = require("process");
router.get("/viewMedicine", viewMedicine);
router.get("/searchMedicineByName", searchMedicineByName);
router.get("/filterMedicineByUse", filterMedicineByUse);

router.get("/downloadm/:medicineId", async (req, res) => {
  try {
    // Find the medicine by ID
    const medicine = await Medicine.findById(req.params.medicineId);

    if (!medicine) {
      return res.status(404).send("Medicine not found");
    }

    // Set the Content-Type header based on the file extension
  

    //
    const contractRelativePath = medicine.imgurl;
    const contractAbsolutePath = path.join(__dirname, '..', contractRelativePath);

    res.sendFile(contractAbsolutePath);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error while downloading file. Try again later.");
  }
});
router.get('/download/:drid', async (req, res) => {
  try {
    // Find the patient by ID
    const patient = await Doctor.findById(req.params.drid);

    if (!patient) {
      return res.status(404).send('Patient not found');
    }

    // Check if the patient has a contract
    if (!patient.contract || !patient.contract.file) {
      return res.status(404).send('Contract not found');
    }

    // Return the contract file path
    const contractRelativePath = patient.contract.file;
    const contractAbsolutePath = path.join(__dirname, '..', contractRelativePath);

    res.sendFile(contractAbsolutePath);
  } catch (error) {
    console.error(error);
    res.status(400).send('Error while downloading file. Try again later.');
  }
});
// Function to get MIME type based on file extension
function getMimeType(fileExtension) {
  switch (fileExtension.toLowerCase()) {
    case ".png":
      return "image/png";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    // Add more cases for other file types as needed
    default:
      return "application/octet-stream";
  }
}
module.exports = router;
