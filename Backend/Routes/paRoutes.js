const express = require("express");
const router = express.Router(); // Create an instance of the Express router

const {
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
} = require("../controllers/paController");
router.post("/addPatient", addPatient);

const {
  viewMedicine,
  searchMedicineByName,
  filterMedicineByUse,
} = require("../controllers/userController");
router.get("/viewMedicine", viewMedicine);
router.get("/searchMedicineByName", searchMedicineByName);
router.get("/filterMedicineByUse", filterMedicineByUse);

router.post("/addMedicineToCart/:userId", addMedicineToCart);
router.get("/viewCart/:userId", viewCart);
router.delete("/removeMedicineFromCart/:userId", removeMedicineFromCart);
router.post("/decreaseMedicine/:userId", decreaseMedicine);
router.post("/addAddress/:userId", addAddress);
router.get("/getAddresses/:userId", getAddresses);
router.post("/payForCart/:userId", payForCart);
router.get("/getPatientOrders/:userId", getPatientOrders);
router.get("/getOrderDetailsById/:orderId", getOrderDetailsById);

module.exports = router;
