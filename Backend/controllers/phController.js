const Pharmacist = require("../Models/pharmacist");
const User = require("../Models/user");

const addPharmacist = async (req, res) => {
  try {
    const { name, email, username, dBirth, gender, docs, status, password } =
      req.body;

    const pharmacist = await Pharmacist.create({
      name,
      email,
      username,
      dBirth,
      gender,
      docs,
      status,
    });
    const user = await User.create({
      username,
      password,
      role: "pharmacist",
    });

    res
      .status(201)
      .json({ message: "pharmacist r got successfully", pharmacist });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports={addPharmacist};