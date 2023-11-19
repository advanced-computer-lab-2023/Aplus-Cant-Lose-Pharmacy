const Pharmacist = require("../Models/pharmacist");
const User = require("../Models/user");
const Medicine = require("../Models/medicine");
const Patient = require("../Models/patient");
const Doctor = require("../Models/doctor");

const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

function generateToken(data) {
    return jwt.sign(data, process.env.TOKEN_SECRET);
}

const addPharmacist = async (req, res) => {
  try {
    const {
      name,
      email,
      username,
      dBirth,
      gender,
      rate,
      affilation,
      background,
      docs,
      password,
    } = req.body;

    // Validate input fields
    if (
      !name ||
      !email ||
      !username ||
      !dBirth ||
      !gender ||
      !rate ||
      !affilation ||
      !background ||
      
      !password
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }
    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({ error: "Password not strong enough" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid email" });
    }

    // Check if the username is already in use
    const userFound = await User.findOne({ username });
    if (userFound) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Check if the email is already in use for either patients or pharmacists
    const emailFoundPatient = await Patient.findOne({ email });
    const emailFoundPharmacist = await Pharmacist.findOne({ email });
    if (emailFoundPatient || emailFoundPharmacist) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Default status is "pending"
    const status = "pending";

    // Create the pharmacist and user records
    const pharmacist = await Pharmacist.create({
      name,
      email,
      username,
      dBirth,
      gender,
      rate,
      affilation,
      background,
      docs,
      status,
    });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the new user
    const newUser = await User.create({
      username,name,email,
      password: hashedPassword,
      role: "pharmacist",
    });
    const data = {
      _id: pharmacist._id
    };
    
    const token= generateToken(data)
    res.status(201).json({ message: "Pharmacist created successfully", username, token,id:pharmacist._id });

  } catch (error) {
    console.error("Error creating pharmacist:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



const addMedicine = async (req, res) => {
  try {
    const { activeElement, price, use, name, amount, imgurl } = req.body;
    const nameFound = await Medicine.findOne({ name: name });
    if (nameFound) {
      res.status(400).json({ error: "Medicine already exists" });
      return;
    }
    const medicine = await Medicine.create({
      activeElement,
      price,
      use,
      name,
      amount,
      imgurl,
    });
    console.log(medicine);
    res
      .status(200)
      .json({ message: "Medicines retrieved successfully", medicine });
  } catch (error) {
    console.error("Error fetching medicines:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getAllPharmacistNames = async (req,res) => {
  try {
    const allPharmacists = await Pharmacist.find({}, 'name'); // Retrieve only the 'name' field for all pharmacist documents
    const pharmacistNames = allPharmacists.map(pharmacist => pharmacist.name); // Extract only the names

    res.status(200).json(pharmacistNames);
  } catch (error) {
    // Handle errors here
    console.error('Error fetching pharmacist names:', error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllDoctorsNames = async (req,res) => {
  try {
    const allPharmacists = await Doctor.find({}, 'name'); // Retrieve only the 'name' field for all pharmacist documents
    const pharmacistNames = allPharmacists.map(pharmacist => pharmacist.name); // Extract only the names

    res.status(200).json(pharmacistNames);
  } catch (error) {
    // Handle errors here
    console.error('Error fetching pharmacist names:', error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const updateMedicineDetails = async (req, res) => {
  try {
    const id = req.params.id; // Get the ID from request parameters
    const { name, activeElement, price, use, amount, imgurl } = req.body;

    // Use findByIdAndUpdate to find and update the medicine
    const updatedMedicine = await Medicine.findByIdAndUpdate(id, {
      $set: {
        name: name,
        activeElement: activeElement,
        price: price,
        use: use,
        amount: amount,
        imgurl: imgurl,
      },
    }, { new: true }); // { new: true } returns the updated document

    if (!updatedMedicine) {
      return res.status(404).json({ error: "Medicine not found" });
    }

    res.status(200).json({ message: "Medicine details updated successfully", medicine: updatedMedicine });
  } catch (error) {
    console.error("Error updating medicine details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { addPharmacist, addMedicine, updateMedicineDetails,getAllPharmacistNames ,getAllDoctorsNames};
