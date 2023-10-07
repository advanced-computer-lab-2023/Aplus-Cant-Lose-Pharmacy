const User = require("../Models/user");
const Pharmacist = require("../Models/pharmacist");
const Patient = require("../Models/patient");
const validator = require('validator');

const createAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Validate input fields
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }

    // Check if the username is already in use
    const userFound = await User.findOne({ username });
    if (userFound) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Password strength validation
    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({ error: "Password not strong enough" });
    }

    // Create the admin user record
    const newAdmin = await User.create({ username, password, role: "admin" });

    res.status(201).json({ message: "Admin user created successfully", user: newAdmin });
  } catch (error) {
    console.error("Error creating admin user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const viewPendPh = async (req, res) => {
  try {
    const pharmacists = await Pharmacist.find({ status: "pending" });
    res
      .status(201)
      .json({ message: "pending pharmacist r got successfully", pharmacists });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const viewJoinedPh = async (req, res) => {
  try {
    const pharmacists = await Pharmacist.find({ status: "accepted" });
    res
      .status(201)
      .json({ message: "accepted pharmacist r got successfully", pharmacists });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const viewPatients = async (req, res) => {
  try {
    const patient = await Patient.find();
    res.status(201).json({ message: "patients r got successfully", patient });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deletePatient = async (req, res) => {
  try {
    const patient = await Patient.deleteOne({ username: req.query.username });
    const user = await User.deleteOne({ username: req.query.username });
    res
      .status(201)
      .json({ message: "patient r deleted  successfully", patient });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const deletePharmacist = async (req, res) => {
  try {
    ///
    const pharmacist = await Pharmacist.deleteOne({
      username: req.query.username,
    });
    const user = await User.deleteOne({ username: req.query.username });

    res
      .status(201)
      .json({ message: "pharmacist r got successfully", pharmacist });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const deleteAdmin = async (req, res) => {
  try {
    ///
    const admin = await User.deleteOne({ username: req.query.username });

    res.status(201).json({ message: "pharmacist r got successfully", admin });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// const acceptPharmacist = async (req, res) => {
//   try {
//     const Pharmacist = await Pharmacist.updateOne({username: req.username },{$set:{status:"accepted"}});
//     res.status(201).json({ message: "Pharmacist r got accepted", Pharmacist });
//   } catch (error) {
//     console.error("Error creating user:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
// const rejectPharmacist = async (req, res) => {
//   try {
//     const Pharmacist = await Pharmacist.updateOne({username: req.username },{$set:{status:"rejected"}});

//     res.status(201).json({ message: "Pharmacist r got accepted", Pharmacist });
//   } catch (error) {
//     console.error("Error creating user:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
///HEalth pack



module.exports = {
  createAdmin,
  viewPendPh,
  viewJoinedPh,
  viewPatients,
  deletePatient,
  deletePharmacist,
  deleteAdmin,
  };
