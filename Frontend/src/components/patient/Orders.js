import React, { useState, useContext } from "react";
import { styled } from "@mui/material/styles";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Fab,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
} from "@mui/material";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  AddShoppingCart as AddShoppingCartIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Favorite as FavoriteIcon,
  Navigation as NavigationIcon,
  Home as HomeIcon,
  Search as SearchIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { SnackbarContext } from "../../App";
import { viewCart } from "../../features/patientSlice";
import { NavLink } from "react-router-dom";
import ViewOrder from "./ViewOrder";


import {
  addMedicineToCart,
  decreaseMedicine,
  getOrderDetailsById
} from "../../features/patientSlice";
import { AutoFixNormal } from "@mui/icons-material";
import RemoveIcon from "@mui/icons-material/Remove";

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function Orders({ orders, pastOrders }) {
  if ((!orders || orders.length === 0) && (!pastOrders || pastOrders.length === 0)) {
    return <div>No orders</div>;
  } else {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              Orders
            </Typography>
          </Toolbar>
        </AppBar>
        <BasicTable rows={orders} />
        <BasicTable2 rows={pastOrders}/>
      </Box>
    );
  }
}
function createData(name, price, use, activeelements, amount, imagelink) {
  return { name, price, use, activeelements, amount, imagelink };
}



function BasicTable({ rows }) {
  const snackbarMessage = useContext(SnackbarContext);


  const dispatch = useDispatch();
  const history = useNavigate();




  const handleViewOrder = async (oid) => {
    await dispatch(getOrderDetailsById({ oid }));
    history("/ViewOrder"); 
  };
 




  const tableContainerStyle = {
    maxWidth: "80%", // Adjust the maximum width as needed
    margin: "0 auto", // Center-align the table horizontally
    marginTop: "40px",
    boxShadow: "5px 5px 5px 5px #8585854a",
  };


if(rows && rows.length > 0) { 
  return (
    <TableContainer component={Paper} style={tableContainerStyle}>
      {/* Dialog component and form go here */}
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              Upcoming orders
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Order date</TableCell>
            <TableCell align="right">Delivery location</TableCell>
            <TableCell align="right">Total price</TableCell>
            <TableCell align="right">View more details</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.orderDate}
              </TableCell>
              <TableCell align="right">{row.address}</TableCell>
              <TableCell align="right">{row.totalPrice}</TableCell>
              <TableCell align="right">
                <Button
                  sx={{
                    backgroundColor: "#004E98",
                    color: "white",
                    marginLeft: "10px",
                  }}
                  onClick={() => handleViewOrder(row._id)}
                >
                  <Typography>View</Typography>
                </Button>
              </TableCell>      
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
}
function BasicTable2({ rows }) {
  const snackbarMessage = useContext(SnackbarContext);


  const dispatch = useDispatch();
  const history = useNavigate();




  const handleViewOrder = async (oid) => {
    await dispatch(getOrderDetailsById({ oid }));
    history("/ViewOrder2"); 
  };
  




  const tableContainerStyle = {
    maxWidth: "80%", // Adjust the maximum width as needed
    margin: "0 auto", // Center-align the table horizontally
    marginTop: "40px",
    boxShadow: "5px 5px 5px 5px #8585854a",
  };


if(rows && rows.length > 0) {
  return (
    <TableContainer component={Paper} style={tableContainerStyle}>
      {/* Dialog component and form go here */}
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
        <TableRow>
            <TableCell>
              Past orders
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Order date</TableCell>
            <TableCell align="right">Delivery location</TableCell>
            <TableCell align="right">Total price</TableCell>
            <TableCell align="right">View more details</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.orderDate}
              </TableCell>
              <TableCell align="right">{row.address}</TableCell>
              <TableCell align="right">{row.totalPrice}</TableCell>
              <TableCell align="right">
                <Button
                  sx={{
                    backgroundColor: "#004E98",
                    color: "white",
                    marginLeft: "10px",
                  }}
                  onClick={() => handleViewOrder(row._id)}
                >
                  <Typography>View</Typography>
                </Button>
              </TableCell>      
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
}