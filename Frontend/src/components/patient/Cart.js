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


import {
  deleteMedicine,
  updateMedicineDetails,
  editMedicine,
} from "../../features/pharmacistSlice";
import { addMedicineToCart, decreaseMedicine } from "../../features/patientSlice";
import { AutoFixNormal } from "@mui/icons-material";
import RemoveIcon from '@mui/icons-material/Remove';

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

export default function Cart({ cart }) {
  if (!cart || cart.length === 0) {
    return <div>No items in the cart</div>;
  }
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
            <HomeIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Cart
          </Typography>
        </Toolbar>
      </AppBar>
      <BasicTable rows={cart} />
    </Box>
  );
}
function createData(name, price, use, activeelements, amount, imagelink) {
  return { name, price, use, activeelements, amount, imagelink };
}

function BasicTable({rows}) {
  const snackbarMessage = useContext(SnackbarContext);
  const [editRow, setEditRow] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [idx, setIdx] = useState(-1);
  

  const handleSubmit = (event) => {
    event.preventDefault();

    setIsOpen(false);
  };
  const HandleAdd = async (id, pid) => {
    try {
      console.log(pid);
      const response = await dispatch(
        addMedicineToCart({ userId: pid, medicineId: id })
      );
      if (response.error) {
        snackbarMessage(`Error: ${response.error.message}`, "error");
      } else {
        snackbarMessage("Added successfully", "success");
      }
      await dispatch(viewCart({ userId: pid }));
    } catch (error) {
      snackbarMessage(`Error: ${error.message}`, "error");
    }
  };
  const HandleSubtract = async (id, pid) => {
    try {
      console.log(pid);
      const response = await dispatch(
        decreaseMedicine({ userId: pid, medicineId: id })
      );
      if (response.error) {
        snackbarMessage(`Error: ${response.error.message}`, "error");
      } else {
        snackbarMessage("Removed successfully", "success");
      }
      await dispatch(viewCart({ userId: pid }));
    } catch (error) {
      snackbarMessage(`Error: ${error.message}`, "error");
    }
  };

  const pid = useSelector((state) => state.user.id);

  const tableContainerStyle = {
    maxWidth: "80%", // Adjust the maximum width as needed
    margin: "0 auto", // Center-align the table horizontally
    marginTop: "40px",
    boxShadow: "5px 5px 5px 5px #8585854a",
  };

  const dispatch = useDispatch();
  const handleEditClick = (row, index) => {
    setIsOpen(true);
    setEditRow(row);
    setIdx(index);
  };
  return (
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
            <TableCell align="center">Change Amount</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.cart.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.activeElement}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
              <TableCell align="right">{row.totalPrice}</TableCell>

              <TableCell align="right">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    marginLeft: "auto",
                  }}
                >
                  <IconButton
                    color="primary"
                    aria-label="decrease amount"
                    onClick={() => HandleSubtract(row.medicineID, pid)}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <IconButton
                    color="primary"
                    aria-label="increase amount"
                    onClick={() => HandleAdd(row.medicineID, pid)}
                  >
                    <AddIcon />
                  </IconButton>
                </div>
              </TableCell>
            </TableRow>
          ))}
          
          {/* Add the Grand Total row here */}
          <TableRow>
            <TableCell colSpan={4} align="right">
              Grand Total:
            </TableCell>
            <TableCell align="right">{rows.grandTotal}</TableCell>
            <TableCell align="center">
            <NavLink exact to="/Checkout">
              <Button variant="contained" color="primary">
                Checkout
              </Button></NavLink>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
