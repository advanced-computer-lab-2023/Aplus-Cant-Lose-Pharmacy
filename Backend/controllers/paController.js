const Patient = require("../Models/patient");
const User = require("../Models/user");
const addPatient = async (req, res) => {
  try {
    const { name, email, username, dBirth, gender, mobile, emergencyContact, password } =
      req.body;
      const userfound = await User.findOne({username: username});
      if (userfound) {
        res.status(400).json({ error: "User already exists" });
        return;
      }
    const patient = await Patient.create({
      name,
      email,
      username,
      dBirth,
      gender,
      mobile,
      emergencyContact
    });
    const user = await User.create({
      username,
      password,
      role: "patient",
    });

    res.status(201).json({ message: "patient r got successfully", patient });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports={addPatient};