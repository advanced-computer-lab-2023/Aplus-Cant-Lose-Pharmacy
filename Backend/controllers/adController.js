const User = require("../Models/user");
const Medicine = require("../Models/medicine");
const Pharmacist = require("../Models/pharmacist");
const Patient = require("../Models/patient");
const HPackages = require("../Models/hpackages");

const createAdmin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const newAdmin = await User.create({ username, password, role: "admin" });
    res
      .status(201)
      .json({ message: "User created successfully", user: newAdmin });
  } catch (error) {
    console.error("Error creating user:", error);
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

const deletePack = async (req, res) => {
  try {
    ///
    const package = await HPackages.deleteOne({ type: req.query.type });

    res.status(201).json({ message: "package r got successfully", package });
  } catch (error) {
    console.error("Error deleting package:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const addPack = async (req, res) => {
  const { type, rate, doctorDisc, medicineDisc, familyDisc } = req.body;
  try {
    ///
    const package = await HPackages.create({
      type,
      rate,
      doctorDisc,
      medicineDisc,
      familyDisc,
    });

    res.status(201).json({ message: "package r got successfully", package });
  } catch (error) {
    console.error("Error creating package:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updatePack = async (req, res) => {
  try {
    ///
    const admin = await User.deleteOne({ username: req.query.username });

    res.status(201).json({ message: "pharmacist r got successfully", admin });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = {
  createAdmin,
  viewPendPh,
  viewJoinedPh,
  viewPatients,
  deletePatient,
  deletePharmacist,
  deleteAdmin,
  addPack,
  deletePack,
  updatePack,
};
