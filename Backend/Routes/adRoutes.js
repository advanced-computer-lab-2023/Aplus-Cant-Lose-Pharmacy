const express = require("express");
const router = express.Router(); // Create an instance of the Express router

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
  deleteAdmin
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
router.delete("/deletePatient", deletePatient);
router.delete("/deletePharmacist", deletePharmacist);
router.delete("/deleteAdmin", deleteAdmin);

module.exports = router; // Export the router instance
