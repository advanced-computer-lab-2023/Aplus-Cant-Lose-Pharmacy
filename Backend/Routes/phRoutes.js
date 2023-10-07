const express = require("express");
const router = express.Router(); // Create an instance of the Express router

const {addPharmacist, addMedicine} = require("../controllers/phController");

router.post("/addPharmacist", addPharmacist); 
router.post("/addMedicine", addMedicine);

module.exports=router;