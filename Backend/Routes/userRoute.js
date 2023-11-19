const express = require("express");
const router = express.Router(); // Create an instance of the Express router
const {login,allUsers }= require("../controllers/userController");
router.route("/users").get(allUsers);


router.post("/login",login);
module.exports=router;