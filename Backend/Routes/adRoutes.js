const express = require("express");
const router = express.Router(); // Create an instance of the Express router
const nodemailer = require('nodemailer');
const {
  getUser,
  viewMedicine,
  searchMedicineByName,
  filterMedicineByUse,
} = require("../controllers/userController");

const {
  createAdmin,
  viewPendPh,
  viewJoinedPh,
  viewPatients,
  deletePatient,
  deletePharmacist,
  deleteAdmin,getAdmins,sendRejectEmail,
  sendAcceptEmail
} = require("../controllers/adController");

// Define your routes and route handlers
router.get("/getUser", getUser);
router.get("/viewMedicine", viewMedicine); //

router.get("/searchMedicineByName", searchMedicineByName);
router.get("/filterMedicineByUse", filterMedicineByUse);

router.post("/createAdmin", createAdmin);
router.get("/viewPendPh", viewPendPh);
router.get("/viewJoinedPh", viewJoinedPh);
router.get("/viewPatients", viewPatients);
router.delete("/deletePatient/:id", deletePatient);
router.delete("/deletePharmacist/:id", deletePharmacist);
router.delete("/deleteAdmin/:id", deleteAdmin);
router.get("/getAdmins", getAdmins);
router.post("/sendAcceptEmail", sendAcceptEmail);
router.post("/sendRejectEmail", sendRejectEmail);



module.exports = router; // Export the router instance
