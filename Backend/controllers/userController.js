const User = require("../Models/user.js");
const Pharmacist = require("../Models/pharmacist.js");
const Patient = require("../Models/patient.js");
const Medicine = require("../Models/medicine.js");
const Admin = require("../Models/admin.js");
const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");

const { default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function generateToken(data) {
  return jwt.sign(data, process.env.TOKEN_SECRET);
}

const sendResetEmail = async (req, res) => {
  const { username } = req.body;
  console.log(username);

  let user; // Declare the user variable

  const u1 = await Patient.findOne({ username });
  const u2 = await Pharmacist.findOne({ username });
  const u3 = await Admin.findOne({ username });

  if (u1) user = u1;
  else if (u2) user = u2;
  else if (u3) user = u3;

  if (!user) {
    return res.send({ Status: "User not found" });
  }

  const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, {
    expiresIn: "1d",
  });
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "apluscantlose@gmail.com",
      pass: "xphjykxmoqljnpen",
    },
  });
  console.log(user.email);
  var mailOptions = {
    from: "apluscantlose@gmail.com",
    to: user.email,
    subject: "Reset Password Link",
    text: `http://localhost:3000/reset_password/${user._id}/${token}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      return res.send({ Status: "Error sending email" }); // Handle the error and send a response
    } else {
      return res.send({ Status: "Success" });
    }
  });
};

// Controller method for changing the user's password
const changePass = async (req, res) => {
  const { username } = req.params;
  const { oldPassword, newPassword } = req.body;
  console.log(username);
  console.log(oldPassword);
  console.log(newPassword);

  try {
    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the old password matches the user's current password
    console.log(user.password);
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Current password is incorrect" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    // Update the password with the new one

    return res.status(200).json({
      message: "Password updated successfully",
      password: newPassword,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const changePassword = async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  try {
    // First, validate the token
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
      if (err) {
        return res.json({ Status: "Error with token" });
      } else {
        // Find the user by ID
        const user =
          (await Patient.findById(id)) ||
          (await User.findById(id)) ||
          (await Pharmacist.findById(id)) ||
          (await Admin.findById(id));

        if (!user) {
          return res.json({ Status: "User not found" });
        }

        // Find the user by username
        const fuser = await User.findOne({ username: user.username });

        if (!fuser) {
          return res.json({ Status: "User not found" });
        }

        // Hash the new password
        bcrypt.hash(password, 10, async (hashErr, hash) => {
          if (hashErr) {
            return res.json({ Status: hashErr });
          }

          // Update the user's password
          fuser.password = hash;

          // Save the user with the new password
          try {
            await fuser.save();
            return res.json({ Status: "Password changed successfully" });
          } catch (saveErr) {
            return res.json({ Status: saveErr });
          }
        });
      }
    });
  } catch (error) {
    return res.json({ Status: error });
  }
};
const createUser = async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const userfound = await User.findOne({ username: username });
    if (userfound) {
      res.status(400).json({ error: "User already exists" });
      return;
    }
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
  const username = req.query.username;
  console.log(username);
  try {
    const fUser = await User.findOne({ username: username });
    console.log(fUser);
    // Your switch statement should be within the try block, not outside it.
    switch (fUser.role) {
      case "patient":
        try {
          const pa = await Patient.findByUsername(fUser.username);
          res.status(201).json({
            message: "patient found successflly",
            user: { fUser, pa },
          });
        } catch (err) {
          console.error("Error handling patient:", err);
          res.status(500).json({ error: "Internal Server Error" });
        }
        break;
      case "pharmacist":
        try {
          const ph = await Pharmacist.findByUsername(fUser.username);
          res.status(201).json({
            message: "pharmacist found successflly",
            user: { fUser, ph },
          });
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
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });
    console.log(user);
    // Compare the provided password with the hashed password in the database

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log(isPasswordValid);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Incorrect password" });
    }
    const data = {
      _id: user._id,
    };

    // If the password is valid, generate a JWT token
    const token = generateToken(data);

    // Fetch additional user data based on the user's role
    let userData = { fUser: user,logId:user._id }; // Initialize with the user data

    switch (user.role) {
      case "admin":
        try {
          const pa = await Admin.findOne({ username });
          userData.fUser = pa;
        } catch (err) {
          console.error("Error handling patient:", err);
          return res.status(500).json({ error: "user not found" });
        }
        break;

      case "patient":
        try {
          const pa = await Patient.findOne({ username });
          userData.fUser = pa;
        } catch (err) {
          console.error("Error handling patient:", err);
          return res.status(500).json({ error: "user not found" });
        }
        break;

      case "pharmacist":
        try {
          const ph = await Pharmacist.findOne({ username: username });
          if (ph.status === "pending") throw error;
          userData.fUser = ph;
        } catch (error) {
          console.error("Error handling Pharmacist:", error);
          return res.status(500).json({ error: "Internal Server Error" });
        }
        break;

      default:
        return res.status(500).json({ error: "Unknown role" });
    }

    // Set the JWT as a cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7 * 1000, // 7 days in milliseconds
    });

    res.status(201).json({
      message: "User logged in successfully",
      role: user.role,
      userData,
      token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateUser = async (req, res) => {
  // Assuming you have a "userModel" defined somewhere, but it's not clear in your code
  // Also, the parameters for findOneAndUpdate need to be corrected
  User.findOneAndUpdate(
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
  User.deleteOne({ _id: req.params.donationID }, (err, donation) => {
    if (err) {
      res.status(500).json({ error: "Internal Server Error" });
    }
    res.json({ message: "successfully deleted donation" });
  });
};

module.exports = { createUser, getUser, updateUser, deleteUser };

const viewMedicine = async (req, res) => {
  try {
    const medicines = await Medicine.find({status:"unarchived"});
    console.log(medicines);
    res
      .status(200)
      .json({ message: "Medicines retrieved successfully", medicines });
  } catch (error) {
    console.error("Error fetching medicines:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const viewMedicineAll = async (req, res) => {
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


const searchMedicineByName = async (req, res) => {
  try {
    const { name } = req.query;

    // Validate the 'name' parameter
    if (!name || name.trim() === "") {
      return res
        .status(400)
        .json({ error: "Invalid or missing 'name' parameter" });
    }

    // Perform the medicine search by name (partial match)
    const meds = await Medicine.find({ name: { $regex: name, $options: "i" } });

    if (meds.length === 0) {
      return res.status(404).json({ error: "Medicine not found" });
    }

    // Send a successful response with a 200 status code
    res.status(200).json({ message: "Medicines retrieved successfully", meds });
  } catch (error) {
    console.error("Error searching for medicine by name:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const filterMedicineByUse = async (req, res) => {
  try {
    const { use } = req.query;

    // Validate the 'use' parameter
    if (!use || use.trim() === "") {
      return res
        .status(400)
        .json({ error: "Invalid or missing 'use' parameter" });
    }

    // Perform the medicine search by 'use' (partial match)
    const medicines = await Medicine.find({
      use: { $regex: use, $options: "i" },
    });

    if (medicines.length === 0) {
      return res.status(404).json({ error: "Medicine not found" });
    }

    // Send a successful response with a 200 status code
    res
      .status(200)
      .json({ message: "Medicines retrieved successfully", medicines });
  } catch (error) {
    console.error("Error searching for medicine by use:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const logout = async (req, res) => {
  try {
    // Add logic for token blacklisting if needed
    // Blacklist the token associated with the logged-out user

    // Clear the token cookie
    res.clearCookie("jwt");

    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const allUsers = asyncHandler(async (req, res) => {
  try {
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
            { username: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};

    const users = await User.find(keyword);
    res.send(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = {
  createUser,
  getUser,
  checkUser,
  updateUser,
  deleteUser,
  viewMedicine,
  searchMedicineByName,
  filterMedicineByUse,
  login,
  sendResetEmail,
  changePass,
  changePassword,
  logout,
  allUsers,viewMedicineAll
};
