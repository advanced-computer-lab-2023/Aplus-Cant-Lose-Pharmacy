import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { viewCart, getAddresses, addAddress } from "../../features/patientSlice";

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

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const pid = useSelector((state) => state.user.id);
  const { cart, addresses } = useSelector((state) => state.patient);

  const [selectedLocation, setSelectedLocation] = useState("");
  const [isAddLocationOpen, setAddLocationOpen] = useState(false);
  const [newLocation, setNewLocation] = useState("");

  useEffect(() => {
    dispatch(viewCart({ userId: pid }));
    dispatch(getAddresses({ userId: pid }));
  }, [dispatch, pid]);

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
    if(location){
        setAddLocationOpen(false);
        await dispatch(addAddress({ userId: pid, address: location}));
        await dispatch(getAddresses({ userId: pid }));
    }
  };

  const handleConfirmPayment = () => {
    // Add logic to handle payment confirmation
    // You can dispatch actions, make API calls, etc.
  };

  let sum = 0;

  // iterate over each item in the array
  for (let i = 0; i < cart.cart.length; i++) {
    sum += cart.cart[i].amount;
  }

  console.log(addresses);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Checkout Summary
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

      <Button variant="outlined" onClick={handleAddLocation}>
        Add New Location
      </Button>

      {/* Payment options */}
      <Typography variant="h6" gutterBottom>
        Payment Options
      </Typography>

      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel id="payment-label">Payment Method</InputLabel>
        <Select
          labelId="payment-label"
          id="payment-select"
          label="Payment Method"
        >
          <MenuItem value="wallet">Wallet</MenuItem>
          <MenuItem value="creditCard">Credit Card</MenuItem>
          <MenuItem value="cashOnDelivery">Cash on Delivery</MenuItem>
        </Select>
      </FormControl>

      {/* Checkout button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleConfirmPayment}
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
          <Button onClick={() => handleAddNewLocation(newLocation)} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CheckoutPage;
