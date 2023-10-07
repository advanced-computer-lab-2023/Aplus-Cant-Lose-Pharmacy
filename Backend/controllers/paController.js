const Patient = require("../Models/patient");
const User = require("../Models/user");
const Pharmacist = require("../Models/pharmacist");
const validator = require('validator');
const addPatient = async (req, res) => {
  try {
    const { name, email, username, dBirth, gender, mobile, emergencyContact, password } = req.body;

    // Validate input fields
    if (!name || !email || !username || !dBirth || !gender || !mobile || !emergencyContact || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Check if the username is already in use
    const userFound = await User.findOne({ username });
    if (userFound) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Check if the email is already in use
    const emailFound = await Patient.findOne({ email });
    const emailFound2 = await Pharmacist.findOne({ email });
    if (emailFound || emailFound2) {
      return res.status(400).json({ error: "Email already exists" });
    }

    if(!validator.isStrongPassword(password)){
      return res.status(400).json({ error: "Password not strong enough" });
    }

    // Create the patient and user records
    const patient = await Patient.create({
      name,
      email,
      username,
      dBirth,
      gender,
      mobile,
      emergencyContact,
    });

    const user = await User.create({
      username,
      password,
      role: "patient",
    });

    res.status(201).json({ message: "Patient created successfully", patient });
  } catch (error) {
    console.error("Error creating patient:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports={addPatient};