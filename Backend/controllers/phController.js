const Pharmacist = require("../Models/pharmacist");
const User = require("../Models/user");

const addPharmacist = async (req, res) => {
  try {
    const { name, email, username, dBirth, gender, rate, affilation, background, docs, password } =
      req.body;
      const userfound = await User.findOne({username: username});
      if (userfound) {
        res.status(400).json({ error: "User already exists" });
        return;
      }
      const status = "pending";
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

    res
      .status(201)
      .json({ message: "pharmacist r got successfully", pharmacist });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports={addPharmacist};