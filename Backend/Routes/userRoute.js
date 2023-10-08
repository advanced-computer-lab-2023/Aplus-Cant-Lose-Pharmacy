const express = require("express");
const router = express.Router(); // Create an instance of the Express router
require("dotenv").config();
const {login }= require("../controllers/userController.js");


router.post("/login",login);
module.exports=router;