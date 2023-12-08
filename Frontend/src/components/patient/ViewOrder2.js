import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useContext } from "react";

import {
  viewCart,
  getAddresses,
  addAddress,
  getWallet,
  payForCart,
} from "../../features/patientSlice";
import { SnackbarContext } from "../../App";

import { NavLink, useNavigate } from "react-router-dom";
import { cancelOrder } from "../../features/patientSlice";


import {
  Box,
  Typography,
  Button,Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
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
import { Link } from "react-router-dom";
const ViewOrder = () => {
  const snackbarMessage = useContext(SnackbarContext);
  const order = useSelector((state) => state.patient.orderDetails);
  const role = useSelector((state) => state.user.role);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(order);

  const handleCancelOrder = async () => {
    try {
      // Dispatch an action to cancel the order on the server
      await dispatch(cancelOrder({ oid: order.orderId }));
      snackbarMessage("Order canceled successfully", "success");
      // Navigate to the home page or any other desired destination
      navigate("/Home");
    } catch (error) {
      snackbarMessage("Error cancelling order", "error");
    }
  };
  const tableContainerStyle = {
    maxWidth: "80%", // Adjust the maximum width as needed
    margin: "0 auto", // Center-align the table horizontally
    marginTop: "40px",
    boxShadow: "5px 5px 5px 5px #8585854a",
  };

  // Add logic to handle payment confirmation
  // You can dispatch actions, make API calls, etc.

  return (
    role==="patient"?
    <Box>
      <div style={{ position: "absolute", top: 0, left: 0, padding: "10px" }}>
        <NavLink exact to="/Home">
          <Button variant="outlined" color="primary">
            Return
          </Button>
        </NavLink>
      </div>

      <Typography variant="h4" gutterBottom style={{ marginTop: "50px" }}>
        Order Summary
      </Typography>

      <Typography variant="h6" gutterBottom>
        Grand Total: {order.totalPrice}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Date: {order.orderDate}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Delivery location: {order.address}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Status: {order.status}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Payment type: {order.payment}
      </Typography>


      <TableContainer component={Paper} style={tableContainerStyle}>
      {/* Dialog component and form go here */}
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Active Elements</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Total Price</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {order.cart.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.activeElement}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.cartAmount}</TableCell>
              <TableCell align="right">{row.price * row.cartAmount}</TableCell>
            </TableRow>
          ))}

          {/* Add the Grand Total row here */}
          
        </TableBody>
      </Table>
    </TableContainer>
      
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

export default ViewOrder;
