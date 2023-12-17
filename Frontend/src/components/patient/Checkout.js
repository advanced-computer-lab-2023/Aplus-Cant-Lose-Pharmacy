import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useContext } from "react";

import {
  viewCart,
  getAddresses,
  addAddress,
  getWallet,
  payForCart,
  createCartCheckoutSession,
} from "../../features/patientSlice";
import { SnackbarContext } from "../../App";
import PaHome from "./PaHome";
import { useNavigate } from "react-router-dom";


import {
  Box,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { NavLink,Link } from "react-router-dom";

const CheckoutPage = () => {
  const snackbarMessage = useContext(SnackbarContext);
  const dispatch = useDispatch();
  const history = useNavigate();
  const pid = useSelector((state) => state.user.id);
  const role = useSelector((state) => state.user.role);

  const url = useSelector((state) => state.patient.paymentURL);
  const { cart, addresses, wallet } = useSelector((state) => state.patient);

  const [selectedLocation, setSelectedLocation] = useState("");
  const [isAddLocationOpen, setAddLocationOpen] = useState(false);
  const [newLocation, setNewLocation] = useState("");
  const [paymentType, setPaymentType] = useState("");

  useEffect(() => {
    dispatch(viewCart({ userId: pid }));
    dispatch(getAddresses({ userId: pid }));
    dispatch(getWallet({ userId: pid }));
  }, [dispatch, pid]);

  useEffect(() => {
    // Redirect when paymentURL is updated
    if (url) {
      console.log(url);
      window.location.href = url;
    }
  }, [url]);

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const handleAddLocation = () => {
    setAddLocationOpen(true);
  };

  const handleCloseAddLocation = () => {
    setAddLocationOpen(false);
    // Add logic to save the new location
    // For example, dispatch an action to update patient's locations in Redux store
  };
  const handleAddNewLocation = async (location) => {
    if (location) {
      setAddLocationOpen(false);
      await dispatch(addAddress({ userId: pid, address: location }));
      await dispatch(getAddresses({ userId: pid }));
    }
  };

  const handleConfirmPayment = async (selectedLocation, paymentType) => {
    const cost = cart.grandTotal;
    if (!selectedLocation || !paymentType) {
      snackbarMessage(`Location and payment type required`, "error");
      return;
    }
    if (paymentType === "Wallet" && wallet < cart.grandTotal) {
      snackbarMessage(`Not enough money in wallet!`, "error");
      return;
    }
    
    if (paymentType !== "Credit Card") {
      await dispatch(
        payForCart({
          userId: pid,
          paymentType: paymentType,
          address: selectedLocation,
        })
      );
      snackbarMessage("Ordered successfully!", "success");
      history("/Home");
    }
    else{
      await dispatch(createCartCheckoutSession({ pid: pid, address: selectedLocation, amount: cost }));
    }
    // Add logic to handle payment confirmation
    // You can dispatch actions, make API calls, etc.
  };

  let sum = 0;

  // iterate over each item in the array
  if (cart.cart) {
    for (let i = 0; i < cart.cart.length; i++) {
      sum += cart.cart[i].amount;
    }
  }

  const formattedWallet = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD", // or your preferred currency code
  }).format(wallet);
const navigate = useNavigate();
  return (
    role==="patient" ?
    <Box sx={{ml:"20%",borderWidth:"3px"}}>
      <div style={{ position: "absolute", top: 0, left: 0, padding: "10px" }}>
        <NavLink exact to="/Home">
          <Button variant="outlined" color="primary">
            Return
          </Button>
        </NavLink>
      </div>
      
      <Typography variant="h4" gutterBottom style={{ marginTop: "50px" }}>
        Checkout Summary
        <div align="right" style={{ fontSize: "16px" }}>
          Wallet: {formattedWallet}
        </div>
      </Typography>
      <Typography variant="h6" gutterBottom>
        {sum} items
      </Typography>
      <Typography variant="h6" gutterBottom>
        Grand Total: {cart.grandTotal}
      </Typography>

      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel id="location-label">Delivery Location</InputLabel>
        <Select
        style={{width:"40%"}}
          labelId="location-label"
          id="location-select"
          value={selectedLocation}
          label="Delivery Location"
          onChange={handleLocationChange}
        >
          {addresses.map((location) => (
            <MenuItem key={location._id} value={location.location}>
              {location.location}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button variant="outlined" style={{width:"10%"}} onClick={handleAddLocation}>
        Add New Location
      </Button>

      {/* Payment options */}
      <Typography variant="h6" gutterBottom   >
        Payment Options
      </Typography>

      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel id="payment-label">Payment Method</InputLabel>
        <Select
          labelId="payment-label"
          id="payment-select"
          label="Payment Method"
          style={{width:"40%"}}
          onChange={(e) => setPaymentType(e.target.value)}
        >
          <MenuItem value="Wallet">Wallet</MenuItem>
          <MenuItem value="Credit Card">Credit Card</MenuItem>
          <MenuItem value="Cash On Delivery">Cash on Delivery</MenuItem>
        </Select>
      </FormControl>

      {/* Checkout button */}
      <Button
      style={{width:"20%"}}
      
        variant="contained"
        color="primary"
        sx={{marginLeft:"60px",borderRadius:"15px"}}
        onClick={() => handleConfirmPayment(selectedLocation, paymentType)}
      >
        Confirm Payment
      </Button>

      {/* Add Location Dialog */}
      <Dialog open={isAddLocationOpen} onClose={handleCloseAddLocation}>
        <DialogTitle>Add New Location</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="new-location"
            label="New Location"
            type="text"
            fullWidth
            value={newLocation}
            onChange={(e) => setNewLocation(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddLocation} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => handleAddNewLocation(newLocation)}
            color="primary"
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>:<>
      <Link to="/Login" sx={{ left: "100%" }}>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            flexGrow: 1,
            display: { xs: "none", sm: "flex" },
            fontSize: "20px",
            maragin: "auto",
          }}
        >
          Login
        </Typography>
      </Link>
    </>
  );
};

export default CheckoutPage;
