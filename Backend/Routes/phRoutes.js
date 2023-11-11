const express = require("express");
const router = express.Router(); // Create an instance of the Express router
const path = require('path');
const multer = require('multer');
const FilePh = require('../Models/filePh');
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, './files');
    },
    filename(req, file, cb) {
      cb(null, `${new Date().getTime()}_${file.originalname}`);
    }
  }),
  fileFilter(req, file, cb) {
    // Allow any file type
    cb(null, true);
  }
});

router.post(
  '/upload/:id',
  upload.array('files', 3), // Use upload.array to accept multiple files
  async (req, res) => {
    try {
      const files = req.files;

      const fileObjects = files.map((file, index) => ({
        title: index === 0 ? 'id' : index === 1 ? 'degree' : 'license',
        description: 'File description', // You can customize this
        file_path: file.path,
        file_mimetype: file.mimetype
      }));

      await FilePh.create({ files: fileObjects ,phID:req.params.id}); // Corrected typo

      res.send('Files uploaded successfully.');
    } catch (error) {
      console.error(error);
      res.status(400).send('Error while uploading files. Try again later.');
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
  destination: "./medicines",
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
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
const {addPharmacist, addMedicine,updateMedicineDetails} = require("../controllers/phController");

router.post("/addPharmacist", addPharmacist); 
router.post("/addMedicine", addMedicine);
router.put("/updateMedicineDetails/:id", updateMedicineDetails);

const {viewMedicine, searchMedicineByName, filterMedicineByUse} = require("../controllers/userController");
const { title } = require("process");
router.get("/viewMedicine", viewMedicine);
router.get("/searchMedicineByName", searchMedicineByName);
router.get("/filterMedicineByUse", filterMedicineByUse);

module.exports=router;