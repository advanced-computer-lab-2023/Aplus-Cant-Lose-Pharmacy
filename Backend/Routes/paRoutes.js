
const express = require("express");
const router = express.Router(); // Create an instance of the Express router

const {addPatient} = require("../controllers/paController");
router.post("/addPatient", addPatient); 

module.exports=router;


