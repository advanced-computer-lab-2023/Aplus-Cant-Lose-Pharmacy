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
import { useContext, useEffect, useState } from "react";
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
import download from "downloadjs"; // Import download function
import axios from "axios";
import { API_URL } from "../../Consts.js";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { viewMedicine } from "../../features/adminSlice";

import{ addMedicineToCart } from "../../features/patientSlice";
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

const handleDownload = async (mId) => {
  try {
    const result = await axios.get(`${API_URL}/pharmacist/downloadm/${mId}`, {
      responseType: "blob",
    });
    const filename = "medicine"; // Set the filename as needed
    download(result.data, filename);
  } catch (error) {
    console.error("Error while downloading file. Try again later.", error);
  }
};

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


export default function Medicine() {
  const [nameFilter, setNameFilter] = useState("");
  const [useFilter, setUseFilter] = useState("");
  const dispatch = useDispatch();
  const snackbarMessage = useContext(SnackbarContext);

  useEffect(() => {
    dispatch(viewMedicine());
  }, [dispatch]);

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
        nameFilter={nameFilter}
        useFilter={useFilter}
  
      />
    </Box>
  );
}
function createData(name, price, use, activeelements, amount, imagelink) {
  return { name, price, use, activeelements, amount, imagelink };
}

function BasicTable({ nameFilter, useFilter }) {
  const dispatch = useDispatch();

  const pid = useSelector((state) => state.user.id);

  useEffect(() => {
    dispatch(viewMedicine());
 }, [dispatch]);
  const medicineList  = useSelector((state) => state.admin.medicine);

  const snackbarMessage = useContext(SnackbarContext);
  const [editRow, setEditRow] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [idx, setIdx] = useState(-1);
  const [id, setId] = useState("1");

  const handleEditClick = (row, index) => {
    setIsOpen(true);
    setEditRow(row);
    setId(row._id);
    console.log(id);
    setIdx(index);
  };
  
  useEffect(() => {
    // This will log the updated id value
  }, [medicineList]);

 

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
    } catch (error) {
      snackbarMessage(`Error: ${error.message}`, "error");
    }
  };

  const tableContainerStyle = {
    maxWidth: "80%", // Adjust the maximum width as needed
    margin: "0 auto", // Center-align the table horizontally
    marginTop: "40px",
    boxShadow: "5px 5px 5px 5px #8585854a",
  };

  return (
    <TableContainer component={Paper} style={tableContainerStyle}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{fontWeight:"bold",fontSize:"20px"}}>Name</TableCell>
            <TableCell align="right" sx={{fontWeight:"bold",fontSize:"20px"}}>Price</TableCell>
            <TableCell align="right" sx={{fontWeight:"bold",fontSize:"20px"}}>Use</TableCell>
            <TableCell align="right" sx={{fontWeight:"bold",fontSize:"20px"}}>Active Elements</TableCell>
            <TableCell align="right" sx={{fontWeight:"bold",fontSize:"20px"}}>Amount</TableCell>
            <TableCell align="right" sx={{width:'20%',fontWeight:"bold",fontSize:"20px" }}>
              Image 
            </TableCell>
            <TableCell align="right"  sx={{fontWeight:"bold",fontSize:"20px"}}>Add to cart</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {medicineList
            .filter((row) => {
              return (
                nameFilter === "" ||
                row.name.toLowerCase().includes(nameFilter.toLowerCase())
              );
            })
            .filter((row) => {
              return (
                useFilter === "" ||
                row.use.toLowerCase().includes(useFilter.toLowerCase())
              );
            })
            .map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right" sx={{fontSize:"18px"}}>{row.price}</TableCell>
                <TableCell align="right" sx={{fontSize:"18px"}}>{row.use}</TableCell>
                <TableCell align="right" sx={{fontSize:"18px"}}>{row.activeElement}</TableCell>
                <TableCell align="right" sx={{fontSize:"18px"}}>{row.amount}</TableCell>
                <TableCell align="right" sx={{  }}>
                    {/* Display the image directly */}
                    <img
                      src={`/public/${row.imgurl}`}
                      alt="medicine"
                      style={{
                        width: "70%",
                        height: "70%",
                      }}
                
                    />
                  </TableCell>
                <TableCell align="right" >
                  <div
                    style={{
              
                  
                      maraginLeft:"0px"
                    }}
                  >
                    <IconButton
                      color="primary"
                      aria-label="add to shopping cart"
                      onClick={() => HandleAdd(row._id, pid)}
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
