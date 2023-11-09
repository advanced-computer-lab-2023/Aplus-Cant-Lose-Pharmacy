import { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useContext } from "react";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteIcon from "@mui/icons-material/Favorite";
import NavigationIcon from "@mui/icons-material/Navigation";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import * as React from "react";
import Button from "@mui/material/Button";
import { SnackbarContext } from "../../App";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import {
  deleteMedicine,
  updateMedicineDetails,
  editMedicine,
} from "../../features/pharmacistSlice";
import { AutoFixNormal } from "@mui/icons-material";
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

export default function Medicine({ medicines }) {
  const [nameFilter, setNameFilter] = useState("");
  const [useFilter, setUseFilter] = useState("");

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
            Medicine List
          </Typography>
          <TextField
            value={nameFilter}
            onChange={(e) => {
              setNameFilter(e.target.value);
            }}
            sx={{
              height: "80%",
              borderRadius: "15px",
              backgroundColor: "white",
              color: "white !important",
            }}
            label="Name..."
            variant="filled"
          />
          <TextField
            value={useFilter}
            onChange={(e) => {
              console.log(e.target.value);
              setUseFilter(e.target.value);
            }}
            sx={{
              height: "80%",
              borderRadius: "15px",
              backgroundColor: "white",
              color: "white !important",
            }}
            label="Use..."
            variant="filled"
          />
        </Toolbar>
      </AppBar>
      <BasicTable
        rows={medicines}
        nameFilter={nameFilter}
        useFilter={useFilter}
      />
    </Box>
  );
}

function createData(name, price, use, activeelements, amount, imagelink) {
  return { name, price, use, activeelements, amount, imagelink };
}

function BasicTable({ rows, nameFilter, useFilter }) {
  const snackbarMessage = useContext(SnackbarContext);
  const [editRow, setEditRow] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [idx, setIdx] = useState(-1);

  const handleSubmit = (event) => {
    event.preventDefault();

    const sampleData = {
      activeElement: event.target.elements.activeElement.value,
      price: event.target.elements.price.value,
      use: event.target.elements.use.value,
      name: event.target.elements.name.value,
      amount: event.target.elements.amount.value,
      imgurl: event.target.elements.imgurl.value,
      _id: editRow._id,
    };

    console.log(sampleData);
    dispatch(editMedicine({ idx: idx, newData: sampleData }));
    const response = dispatch(updateMedicineDetails(sampleData));

    response.then((responseData) => {
      console.log(responseData);
      if (responseData.payload.status < 300) {
        snackbarMessage("You have successfully edited", "success");
      } else {
        snackbarMessage(`error: ${responseData} has occurred`, "error");
      }
    });
    setIsOpen(false);
  };

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
      <Dialog open={isOpen}>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-body">
            <label className="form__label" for="name">
              name
            </label>
            <input
              style={{ width: "92%" }}
              type="text"
              id="name"
              defaultValue={editRow.name}
              required
            />
            <label for="activeElement">Active element</label>
            <input
              type="text"
              id="activeElement"
              defaultValue={editRow.activeElement}
              required
            />
            <label for="use">Medicinal use</label>
            <input
              style={{ width: "92%" }}
              type="text"
              id="use"
              defaultValue={editRow.use}
              required
            />

            <label className="form__label" for="price">
              Price
            </label>
            <input
              type="number"
              id="price"
              required
              style={{ width: "94%", borderRadius: "3px" }}
              defaultValue={editRow.price}
            />

            <label className="form__label" for="amount">
              Available Quantity{" "}
            </label>
            <input
              type="number"
              id="amount"
              defaultValue={editRow.amount}
              required
              style={{ width: "94%", borderRadius: "3px" }}
            />

            <label for="imgurl">Image url</label>
            <input
              style={{ width: "92%" }}
              type="text"
              id="imgurl"
              defaultValue={editRow.imgurl}
              required
            />
          </div>
          <div className="footer">
            <button type="submit" class="btn">
              Edit
            </button>
          </div>
        </form>
        <p>gyrfeijkwosxdvhr</p>
      </Dialog>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Use</TableCell>
            <TableCell align="right">Active Elements</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Image Link</TableCell>
            <TableCell align="right">Add to cart</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows
            .filter((row) => {
              const nameMatch =
                nameFilter === "" ||
                row.name.toLowerCase().includes(nameFilter.toLowerCase());
              const useMatch =
                useFilter === "" ||
                row.use.toLowerCase().includes(useFilter.toLowerCase());
              return nameMatch && useMatch;
            })
            .map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="right">{row.use}</TableCell>
                <TableCell align="right">{row.activeElement}</TableCell>
                <TableCell align="right">{row.amount}</TableCell>
                <TableCell align="right">{row.imgurl}</TableCell>
                <TableCell align="right" >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "wrap",
                      marginLeft: "auto"
                    }}
                  >
                    <IconButton
                      color="primary"
                      aria-label="add to shopping cart"
                    >
                      <AddShoppingCartIcon />
                    </IconButton>
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
