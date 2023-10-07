const Pharmacist = require("../Models/pharmacist");
const User = require("../Models/user");
const Medicine = require("../Models/medicine");
const Patient = require("../Models/patient");
const validator = require('validator');

const addPharmacist = async (req, res) => {
  try {
    const { name, email, username, dBirth, gender, rate, affilation, background, docs, password } =
      req.body;

    // Validate input fields
    if (!name || !email || !username || !dBirth || !gender || !rate || !affilation || !background || !docs || !password) {
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

    // Check if the email is already in use for either patients or pharmacists
    const emailFoundPatient = await Patient.findOne({ email });
    const emailFoundPharmacist = await Pharmacist.findOne({ email });
    if (emailFoundPatient || emailFoundPharmacist) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Password strength validation
    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({ error: "Password not strong enough" });
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
      status
    });

    const user = await User.create({
      username,
      password,
      role: "pharmacist",
    });

    res.status(201).json({ message: "Pharmacist created successfully", pharmacist });
  } catch (error) {
    console.error("Error creating pharmacist:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addMedicine = async (req, res) => {
  try {
    const { activeElement, price, use, name, amount, imgurl } = req.body;
    const nameFound = await Medicine.findOne({name: name});
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
const updateMedicineDetails = async (req, res) => {
  try {
    const { oldName, name, activeElement, price } = req.body;

    // Validate that at least one field (name, activeElement, or price) is provided
    if (!name && !activeElement && !price) {
      return res.status(400).json({ error: "At least one field (name, activeElement, or price) must be provided for the update." });
    }

    // Find the medicine by ID
    const medicine = await Medicine.findOne({name: oldName});

    if (!medicine) {
      return res.status(404).json({ error: "Medicine not found" });
    }

    // Update the medicine's details if provided
    if (name) {
      const nameExists = await Medicine.findOne({name: name});
      if (nameExists) {
        return res.status(400).json({ error: "Medicine already exists" });
      }
      medicine.name = name;
    }

    if (activeElement) {
      medicine.activeElement = activeElement;
    }

    // Update the medicine's price if provided
    if (price) {
      medicine.price = price;
    }

    // Save the updated medicine
    await medicine.save();

    res.status(200).json({ message: "Medicine details updated successfully", medicine });
  } catch (error) {
    console.error("Error updating medicine details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



module.exports={addPharmacist, addMedicine, updateMedicineDetails};