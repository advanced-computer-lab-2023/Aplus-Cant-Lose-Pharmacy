const express = require("express");
const router = express.Router(); // Create an instance of the Express router

const {addPharmacist} = require("../controllers/phController");
router.post("/addPharmacist", addPharmacist); 

module.exports=router;