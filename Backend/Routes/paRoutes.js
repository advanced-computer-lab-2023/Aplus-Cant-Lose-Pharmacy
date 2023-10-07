
const express = require("express");
const router = express.Router(); // Create an instance of the Express router

const {addPatient} = require("../controllers/paController");
router.post("/addPatient", addPatient); 

const {viewMedicine, searchMedicineByName, filterMedicineByUse} = require("../controllers/userController");
router.get("/viewMedicine", viewMedicine);
router.get("/searchMedicineByName", searchMedicineByName);
router.get("/filterMedicineByUse", filterMedicineByUse);

module.exports=router;


