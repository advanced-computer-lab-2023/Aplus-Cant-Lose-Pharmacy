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
import { getOrdersInMonth } from "../../features/pharmacistSlice";
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
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import MobileDateRangePicker from "@mui/lab/MobileDateRangePicker";

import {
  deleteMedicine,
  updateMedicineDetails,
  editMedicine,
  archiveMedicine,
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

export default function MonthlyReport() {
  const [nameFilter, setNameFilter] = useState("");
  const [useFilter, setUseFilter] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [startDate, setStartDate] = useState(""); // Add start date state
  const [endDate, setEndDate] = useState(""); // Add end date state
  const dispatch = useDispatch();
  const { report } = useSelector((state) => state.pharmacist);

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const generateDaysArray = (start, end) => {
    const days = [];
    for (let i = start; i <= end; i++) {
      days.push(i);
    }
    return days;
  };

  const defaultStartDate = 1;
  const defaultEndDate = 31;

  useEffect(() => {
    // Dispatch getOrdersInMonth here
    dispatch(getOrdersInMonth({ month: selectedMonth, year: selectedYear }));
    console.log(report);
  }, [dispatch, selectedMonth, selectedYear, report]);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{
              mr: 2,
              width: "25%", // Set the width to 25%
            }}
          >
            <HomeIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Sales Report
          </Typography>
          <TextField
            value={nameFilter}
            onChange={(e) => {
              setNameFilter(e.target.value);
            }}
            sx={{
              height: "80%",
              width: "15%", // Adjust the width as needed
              borderRadius: "15px",
              backgroundColor: "white",
              color: "white !important",
            }}
            label="Name filter"
            variant="filled"
          />
          <TextField
            id="start-date"
            label="Start Date"
            select
            value={startDate || ""}
            onChange={handleStartDateChange}
            variant="outlined"
            sx={{ width: "10%" }} // Adjust the width as needed
          >
            {generateDaysArray(defaultStartDate, defaultEndDate).map((day) => (
              <MenuItem key={day} value={day}>
                {day}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="end-date"
            label="End Date"
            select
            value={endDate || ""}
            onChange={handleEndDateChange}
            variant="outlined"
            sx={{ width: "10%" }} // Adjust the width as needed
          >
            {generateDaysArray(
              startDate || defaultStartDate,
              defaultEndDate
            ).map((day) => (
              <MenuItem key={day} value={day}>
                {day}
              </MenuItem>
            ))}
          </TextField>
          <Select
            value={selectedMonth === "" ? "" : parseInt(selectedMonth, 10)}
            onChange={(e) => setSelectedMonth(e.target.value)}
            variant="outlined"
            displayEmpty
            inputProps={{ "aria-label": "Select Month" }}
            sx={{ marginRight: "16px", minWidth: "100px" }}
          >
            <MenuItem value="" disabled>
              Month
            </MenuItem>
            {Array.from({ length: 12 }, (_, index) => index + 1).map(
              (month) => (
                <MenuItem key={month} value={month}>
                  {new Date(0, month - 1).toLocaleString("en-US", {
                    month: "long",
                  })}
                </MenuItem>
              )
            )}
          </Select>

          <Select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            variant="outlined"
            displayEmpty
            inputProps={{ "aria-label": "Select Year" }}
            sx={{ minWidth: "80px" }}
          >
            <MenuItem value="" disabled>
              Year
            </MenuItem>
            {Array.from(
              { length: new Date().getFullYear() - 2014 },
              (_, index) => 2015 + index
            ).map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </Toolbar>
      </AppBar>

      <BasicTable
        nameFilter={nameFilter}
        startDate={startDate}
        endDate={endDate}
        month={selectedMonth}
        year={selectedYear}
      />
    </Box>
  );
}

function BasicTable({ nameFilter, startDate, endDate, month, year }) {
  const snackbarMessage = useContext(SnackbarContext);
  const dispatch = useDispatch();
  let rows = useSelector((state) => state.pharmacist.report);

  const [editRow, setEditRow] = useState({});
  const [edited, setEdited] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [idx, setIdx] = useState(-1);
  const [id, setId] = useState("1");

  useEffect(() => {}, [dispatch]);

  const [imgUrl, setImgUrl] = useState(""); // Add this line

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64data = reader.result;
      console.log("Base64 Image Data:", base64data);
      setImgUrl(base64data);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const uploadButtonStyle = {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px 15px",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
    width: "20%", // Add margin-top for spacing
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", event.target.elements.imgFile.files[0]);

    axios
      .post(`${API_URL}/pharmacist/upload2`, formData)
      .then((uploadResponse) => {
        // Renamed to uploadResponse
        const imgText = uploadResponse.data;
        const sampleData = {
          activeElement: event.target.elements.activeElement.value,
          price: event.target.elements.price.value,
          use: event.target.elements.use.value,
          name: event.target.elements.name.value,
          amount: event.target.elements.amount.value,
          imgurl: imgText,
          id: id, // Use the text received from the backend
        };

        console.log(sampleData);
        dispatch(editMedicine({ idx: idx, newData: sampleData }));
        const response = dispatch(updateMedicineDetails(sampleData));

        response.then((responseData) => {
          console.log(responseData);
          if (responseData.payload === undefined) {
            snackbarMessage(`error: ${responseData} has occurred`, "error");
          } else {
            snackbarMessage("You have successfully edited", "success");
          }
        });
        setIsOpen(false);
      });
  };
  const fileInputStyle = {
    display: "none",
  };
  const tableContainerStyle = {
    maxWidth: "80%", // Adjust the maximum width as needed
    margin: "0 auto", // Center-align the table horizontally
    marginTop: "40px",
    boxShadow: "5px 5px 5px 5px #8585854a",
  };
  const [imageViewerOpen, setImageViewerOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageViewerOpen = (imgUrl) => {
    setSelectedImage(imgUrl);
    setImageViewerOpen(true);
  };
  if (!month || !year) {
  } else if (rows.length === 0) {
    return <div>No orders for this month</div>;
  } else {
    return (
      <>
        <TableContainer component={Paper} style={tableContainerStyle}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", fontSize: "20px" }}>
                  Order report
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows
                .filter((row) => {
                  const orderDate = new Date(row.orderDate); // Convert orderDate to Date object
                  const startDateFull = new Date(
                    `${year}-${month}-${startDate}`
                  );
                  const endDateFull = new Date(
                    `${year}-${month}-${Number(endDate) + 1}`
                  );

                  return (
                    (nameFilter === "" ||
                      row.cart.some((item) =>
                        item.name
                          .toLowerCase()
                          .includes(nameFilter.toLowerCase())
                      )) &&
                    (!startDate || orderDate >= new Date(startDateFull)) &&
                    (!endDate || orderDate <= new Date(endDateFull))
                  );
                })
                .map((row, index) => (
                  <React.Fragment key={index}>
                    <TableRow>
                      <TableCell
                        colSpan={4}
                        sx={{ fontSize: "20px", fontWeight: "bold" }}
                      >
                        Order Date: {new Date(row.orderDate).toLocaleString()}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold", fontSize: "20px" }}>
                        Name
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{ fontWeight: "bold", fontSize: "20px" }}
                      >
                        Price
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{ fontWeight: "bold", fontSize: "20px" }}
                      >
                        Amount
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{ fontWeight: "bold", fontSize: "20px" }}
                      >
                        Total price
                      </TableCell>
                    </TableRow>
                    {row.cart.map((cartEntry, cartIndex) => (
                      <TableRow key={`${index}-${cartIndex}`}>
                        <TableCell sx={{ fontSize: "18px" }}>
                          {cartEntry.name}
                        </TableCell>
                        <TableCell align="right" sx={{ fontSize: "18px" }}>
                          {cartEntry.price}
                        </TableCell>
                        <TableCell align="right" sx={{ fontSize: "18px" }}>
                          {cartEntry.amount}
                        </TableCell>
                        <TableCell align="right" sx={{ fontSize: "18px" }}>
                          {cartEntry.amount * cartEntry.price}
                        </TableCell>
                      </TableRow>
                    ))}
                  </React.Fragment>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  }
}
