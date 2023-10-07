const User = require("../Models/user.js");
const Pharmacist = require("../Models/pharmacist.js");
const Patient = require("../Models/patient.js");
const Medicine = require("../Models/medicine.js");
const { default: mongoose } = require("mongoose");

const createUser = async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const newUser = await User.create({ username, password, role });
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUser = async (req, res) => {
  const { username } = req.body;
  try {
    const fUser = await User.findOne({ username });

    // Your switch statement should be within the try block, not outside it.
    switch (fUser.role) {
      case "patient":
        try {
          const pa = await Patient.findByUsername(fUser.username);
          res
            .status(201)
            .json({ message: "User created successfully", user: pa });
          return { fUser, pa };
        } catch (err) {
          console.error("Error handling patient:", err);
          res.status(500).json({ error: "Internal Server Error" });
        }
        break;
      case "pharmacist":
        try {
          const ph = await Pharmacist.findByUsername(fUser.username);
          res
            .status(201)
            .json({ message: "User created successfully", user: ph });
          return { fUser, ph };
        } catch (error) {
          console.error("Error handling pharmacist:", error);
          res.status(500).json({ error: "Internal Server Error" });
        }
        break;
      case "admin":
        try {
          return { fUser };
        } catch (error) {
          console.error("Error handling admin:", error);
          res.status(500).json({ error: "Internal Server Error" });
        }
        break;
      default:
        res.status(400).json({ error: "Unknown role" });
    }
  } catch (error) {
    console.error("Error finding user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const checkUser = async (req, res) => {
  const user = await getUser(req.username, res);
  return user.password === req.password
    ? res.status(201).json({ message: "User created successfully", user })
    : res.status(400).json({ error: "Incorrect password" });
};

const updateUser = async (req, res) => {
  // Assuming you have a "userModel" defined somewhere, but it's not clear in your code
  // Also, the parameters for findOneAndUpdate need to be corrected
  userModel.findOneAndUpdate(
    { _id: req.params.donationID },
    req.body, // Update data
    { new: true }, // Return updated document
    (err, user) => {
      if (err) {
        res.status(500).json({ error: "Internal Server Error" });
      }
      res.json(user);
    }
  );
};

const deleteUser = async (req, res) => {
  // Assuming you have a "userModel" defined somewhere, but it's not clear in your code
  userModel.deleteOne({ _id: req.params.donationID }, (err, donation) => {
    if (err) {
      res.status(500).json({ error: "Internal Server Error" });
    }
    res.json({ message: "successfully deleted donation" });
  });
};

module.exports = { createUser, getUser, updateUser, deleteUser };

const viewMedicine = async (req, res) => {
  try {
    const medicines = await Medicine.find();
    console.log(medicines);
    res
      .status(200)
      .json({ message: "Medicines retrieved successfully", medicines });
  } catch (error) {
    console.error("Error fetching medicines:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const addMedicine = async (req, res) => {
  try {
    const { activeElement, price, use, name, amount, imgurl } = req.body;
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

const searchMedicineByName = async (req, res) => {
  try {
    const { name } = req.query;

    // Validate the 'name' parameter
    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "Invalid or missing 'name' parameter" });
    }

    // Perform the medicine search by name
    const meds = await Medicine.find({ name });
    
    // Send a successful response with a 200 status code
    res.status(200).json({ message: "Medicines retrieved successfully", meds });
  } catch (error) {
    console.error("Error searching for medicine by name:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const filterMedicineByUse = async (req, res) => {
  try {
    const medicine = await Medicine.find({ use: req.body.use });
    res.status(201).json({ message: "medicines r got successfully", medicine });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createUser,
  getUser,
  checkUser,
  updateUser,
  deleteUser,
  viewMedicine,
  searchMedicineByName,
  filterMedicineByUse,
  addMedicine
};
