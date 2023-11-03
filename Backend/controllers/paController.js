const Patient = require("../Models/patient");
const User = require("../Models/user");
const Pharmacist = require("../Models/pharmacist");
const Order = require("../Models/orders");
const Medicine = require("../Models/medicine");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function generateToken(data) {
  return jwt.sign(data, process.env.TOKEN_SECRET);
}

const addPatient = async (req, res) => {
  try {
    const {
      name,
      email,
      username,
      dBirth,
      gender,
      mobile,
      emergencyContact,
      password,
    } = req.body;

    // Validate input fields
    if (
      !name ||
      !email ||
      !username ||
      !dBirth ||
      !gender ||
      !mobile ||
      !emergencyContact ||
      !password
    ) {
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

    // Check if the email is already in use
    const emailFound = await Patient.findOne({ email });
    const emailFound2 = await Pharmacist.findOne({ email });
    if (emailFound || emailFound2) {
      return res.status(400).json({ error: "Email already exists" });
    }

    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({ error: "Password not strong enough" });
    }

    // Create the patient and user records
    const patient = await Patient.create({
      name,
      email,
      username,
      dBirth,
      gender,
      mobile,
      emergencyContact,
    });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the new user
    const newUser = await User.create({
      username,
      password: hashedPassword,
      role: "patient",
    });
    const data = {
      _id: patient._id,
    };
    const token = generateToken(data);
    res
      .status(201)
      .json({ message: "Patient created successfully", patient, token });
  } catch (error) {
    console.error("Error creating patient:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addMedicineToCart = async (req, res) => {
  try {
    const { userId } = req.params; // User ID is passed as a parameter
    const { medicineId } = req.body; // Medicine ID is passed in the request body

    // Check if the user with the given ID exists
    const patient = await Patient.findById(userId);

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    if (typeof medicineId === "undefined") {
      return res
        .status(400)
        .json({ error: "Medicine ID is missing in the request body" });
    }

    // Check if the medicine is already in the patient's cart
    const existingMedicine = patient.cart.find(
      (item) => item.medicineID && item.medicineID.toString() === medicineId
    );

    if (existingMedicine) {
      // If the medicine already exists in the cart, increase the amount by 1
      existingMedicine.amount += 1;
    } else {
      // If the medicine is not in the cart, add it with an amount of 1
      patient.cart.push({ medicineID: medicineId, amount: 1 });
    }

    // Save the updated patient document
    await patient.save();

    res
      .status(200)
      .json({ message: "Medicine added to cart successfully", patient });
  } catch (error) {
    console.error("Error adding medicine to cart:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const removeMedicineFromCart = async (req, res) => {
  try {
    const { userId } = req.params; // User ID is passed as a parameter
    const { medicineId } = req.body; // Medicine ID is passed in the request body

    // Check if the user with the given ID exists
    const patient = await Patient.findById(userId);

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    if (typeof medicineId === "undefined") {
      return res
        .status(400)
        .json({ error: "Medicine ID is missing in the request body" });
    }

    // Check if the medicine is in the patient's cart
    const medicineIndex = patient.cart.findIndex(
      (item) => item.medicineID && item.medicineID.toString() === medicineId
    );

    if (medicineIndex > -1) {
      // If the medicine exists in the cart, remove it
      patient.cart.splice(medicineIndex, 1);
    } else {
      // If the medicine is not in the cart, send an error response
      return res.status(404).json({ error: "Medicine not found in cart" });
    }

    // Save the updated patient document
    await patient.save();

    res
      .status(200)
      .json({ message: "Medicine removed from cart successfully", patient });
  } catch (error) {
    console.error("Error removing medicine from cart:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const decreaseMedicine = async (req, res) => {
  try {
    const { userId } = req.params;
    const { medicineId } = req.body;

    // Check if the patient exists
    const patient = await Patient.findById(userId);
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    if (typeof medicineId === "undefined") {
      return res
        .status(400)
        .json({ error: "Medicine ID is missing in the request body" });
    }

    // Find the medicine in the cart
    const medicineIndex = patient.cart.findIndex(
      (item) => item.medicineID.toString() === medicineId
    );

    if (medicineIndex === -1) {
      return res.status(404).json({ error: "Medicine not found in cart" });
    }

    // Decrease the medicine amount by 1
    patient.cart[medicineIndex].amount -= 1;

    // If the amount reaches 0, remove the item from the cart
    if (patient.cart[medicineIndex].amount <= 0) {
      patient.cart.splice(medicineIndex, 1);
    }

    // Save the updated patient document
    await patient.save();

    res
      .status(200)
      .json({ message: "Medicine count updated successfully", patient });
  } catch (error) {
    console.error("Error updating medicine count:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const viewCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const patient = await Patient.findById(userId).populate("cart.medicineID");

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    let grandTotal = 0; // Initialize grand total to 0

    const cartWithMedicineInfo = patient.cart.map((cartItem) => {
      const { medicineID, amount } = cartItem;
      if (
        medicineID &&
        medicineID._id &&
        medicineID.name &&
        medicineID.activeElement &&
        medicineID.price &&
        medicineID.imgurl
      ) {
        const totalPrice = amount * medicineID.price; // Calculate total price for the medicine item
        grandTotal += totalPrice; // Add the total price to the grand total

        return {
          medicineID: medicineID._id,
          name: medicineID.name,
          activeElement: medicineID.activeElement,
          price: medicineID.price,
          amount,
          imgurl: medicineID.imgurl,
          totalPrice, // Include the total price in the response
        };
      }
    });

    res.status(200).json({ cart: cartWithMedicineInfo, grandTotal });
  } catch (error) {
    console.error("Error viewing cart:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addAddress = async (req, res) => {
  try {
    const { userId } = req.params;
    const { location } = req.body;

    // Find the patient by userId
    const patient = await Patient.findById(userId);

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    // Add the new address to the patient's addresses array
    patient.addresses.push({ location });
    await patient.save();

    res.status(201).json({ message: "Address added successfully", patient });
  } catch (error) {
    console.error("Error adding address:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAddresses = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find the patient by userId
    const patient = await Patient.findById(userId);

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    // Extract addresses from the patient object
    const addresses = patient.addresses;

    res.status(200).json({ addresses });
  } catch (error) {
    console.error("Error getting addresses:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const payForCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const { paymentType, address } = req.body;

    // Find the patient by userId
    const patient = await Patient.findById(userId);

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    // Calculate the total price of the items in the cart using Promise.all
    const totalPrice = await Promise.all(patient.cart.map(async (cartItem) => {
      const { medicineID, amount } = cartItem;
      const medicine = await Medicine.findById(medicineID);
      if (!medicine) {
        throw new Error(`Medicine with ID ${medicineID} not found`);
      }
      const itemPrice = medicine.price * amount;
      return itemPrice;
    })).then((prices) => prices.reduce((acc, price) => acc + price, 0));

    // Check if the payment type is 'Wallet'
    if (paymentType === 'Wallet') {
      // Check if the patient's wallet balance is sufficient for the purchase
      if (patient.wallet < totalPrice) {
        return res.status(400).json({ error: "Insufficient funds in the wallet" });
      }

      // Deduct the total price from the patient's wallet
      patient.wallet -= totalPrice;
    }

    // Create a new order
    const order = new Order({
      orderDate: new Date(),
      pID: patient._id,
      cart: patient.cart,
      payment: paymentType,
      totalPrice: totalPrice,
      address: address,
    });

    // Save the order to the database
    await order.save();

    // Clear the cart in the patient's attributes
    patient.cart = [];
    await patient.save();

    return res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    console.error("Error processing order:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getPatientOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find the patient by userId
    const patient = await Patient.findById(userId);

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    // Fetch patient's orders and extract necessary details
    const orders = await Order.find({ pID: userId }).select('_id orderDate location totalPrice');

    return res.status(200).json({ orders });
  } catch (error) {
    console.error("Error fetching patient orders:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


const getOrderDetailsById = async (req, res) => {
  try {
    const { orderId } = req.params;

    // Find the order by orderId and populate the necessary fields
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Extract necessary order details along with patient details
    const orderDetails = {
      orderId: order._id,
      orderDate: order.orderDate,
      location: order.location, // Assuming 'location' is a property in the Order schema
      status: order.status,
      payment: order.payment,
      totalPrice: order.totalPrice,
      cart: order.cart
    };

    return res.status(200).json({ orderDetails });
  } catch (error) {
    console.error("Error fetching order details:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports = {
  addPatient,
  addMedicineToCart,
  viewCart,
  removeMedicineFromCart,
  decreaseMedicine,
  addAddress,
  getAddresses,
  payForCart,
  getPatientOrders,
  getOrderDetailsById
};
