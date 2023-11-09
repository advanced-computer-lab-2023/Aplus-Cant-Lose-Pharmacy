const User = require("../Models/user");
const Admin = require("../Models/admin");

const Pharmacist = require("../Models/pharmacist");
const Patient = require("../Models/patient");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');

function generateToken(data) {
  return jwt.sign(data, process.env.TOKEN_SECRET);
}
const getAdmins = async (req, res) => {
  try {
    const fUser = await User.find({ role: "admin" });
    console.log(fUser);
    res.status(201).json({
      message: "Admin found successfully",
      admins: [...fUser],
    });
  } catch (error) {
    console.error("Error finding Admins:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createAdmin = async (req, res) => {
  const { username, password,email } = req.body;

  try {
    // Validate input fields
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    // Check if the username is already in use
    const userFound = await User.findOne({ username });
    if (userFound) {
      return res.status(400).json({ error: "Username already exists" });
    }
    const emailFoundPatient = await Patient.findOne({ email });
    const emailFoundPharmacist = await Pharmacist.findOne({ email });
    const emailFoundadmin = await Admin.findOne({ email });

    if (emailFoundPatient || emailFoundPharmacist || emailFoundadmin) {
      return res.status(400).json({ error: "Email already exists" });
    }


    // Password strength validation
    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({ error: "Password not strong enough" });
    }

    // Create the admin user record
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the new user
    const newAdmin2 = await User.create({
      username,
      password: hashedPassword,
      role: "admin",
    });
    const newAdmin = await Admin.create({
      username,
      password: hashedPassword,
      email
    });
    const data = {
      _id: newAdmin._id,
    };
    const token = generateToken(data);
    res
      .status(201)
      .json({
        message: "Admin user created successfully",
        userAdmin: newAdmin,
        token,
      });
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
  const patientId = req.params.id; // Assuming the ID is passed as a parameter

  try {
    const patient = await Patient.findByIdAndDelete(patientId);
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    // You may also want to delete the associated user
    const user = await User.findOneAndDelete({ username: patient.username });

    res.status(201).json({ message: "Patient deleted successfully", patient });
  } catch (error) {
    console.error("Error deleting patient:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
//

const deletePharmacist = async (req, res) => {
  const pharmacistId = req.params.id; // Assuming the ID is passed as a parameter

  try {
    const pharmacist = await Pharmacist.findByIdAndDelete(pharmacistId);
    if (!pharmacist) {
      return res.status(404).json({ error: "pharmacist not found" });
    }

    // You may also want to delete the associated user
    const user = await User.findOneAndDelete({ username: pharmacist.username });

    res
      .status(201)
      .json({ message: "pharmacist deleted successfully", pharmacist });
  } catch (error) {
    console.error("Error deleting pharmacist:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const deleteAdmin = async (req, res) => {
  try {
    const adminId = req.params.id;
    const admin = await User.findByIdAndDelete(adminId);
    res.status(201).json({ message: "admin r deleted successfully", admin });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const sendAcceptEmail = async (req, res) => {
  const { id } = req.body;

  try {
    // Find the user by ID
    const user = await Pharmacist.findById(id);

    if (!user) {
      return res.status(404).send({ Status: "User not found" });
    }

    // Update the user's status to "accepted"
    user.status = "accepted";
    await user.save();

    // Create a transporter for sending email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.Password,
      },
    });

    // Define email options
    const mailOptions = {
      
      from: process.env.EMAIL_FROM,
      to: user.email, // Assuming the user has an 'email' field, adjust as needed
      subject: "Acceptance Confirmation",
      text: `Congratulations! You have been accepted to join El7a2ni Pharmacy as a Pharmacist.
      
      El7a2ni Pharmacy`,
    };

    // Send the email
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.status(500).send({ Status: "Error sending email" });
      } else {
        return res.status(200).send({ Status: "Success" });
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ Status: "Server Error" });
  }
};
const sendRejectEmail = async (req, res) => {
  const { id } = req.body;

  try {
    // Find the user by ID
    const user = await Pharmacist.findById(id);

    if (!user) {
      return res.status(404).send({ Status: "User not found" });
    }

    // Update the user's status to "accepted"
    user.status = "rejected";
    await user.save();

    // Create a transporter for sending email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.Password,
      },
    });

    // Define email options
    const mailOptions = {
      from:process.env.EMAIL_FROM,
      to: user.email, // Assuming the user has an 'email' field, adjust as needed
      subject: "Rejection Confirmation",
      text: `Unfortunately! You did not get accepted  to join El7a2ni Pharmacy as a Pharmacist.
          
      El7a2ni Pharmacy`,
    };

    // Send the email
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.status(500).send({ Status: "Error sending email" });
      } else {
        return res.status(200).send({ Status: "Success" });
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ Status: "Server Error" });
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
  getAdmins,
  sendAcceptEmail,
  sendRejectEmail
};
