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
import { archive, viewMedicine } from "../../features/pharmacistSlice";
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
  const medicines = useSelector((state) => state.pharmacist.medicineList);
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
      <BasicTable nameFilter={nameFilter} useFilter={useFilter} />

      <Box sx={{ "& > :not(style)": { m: 1 } }}>
        <Link to="/Medicine/add">
          {" "}
          <Fab color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </Link>
      </Box>
    </Box>
  );
}

function createData(name, price, use, activeelements, amount, imagelink) {
  return { name, price, use, activeelements, amount, imagelink };
}

function BasicTable({ nameFilter, useFilter }) {
  const snackbarMessage = useContext(SnackbarContext);
  const dispatch = useDispatch();
  let rows = useSelector((state) => state.pharmacist.medicineList);

  const [editRow, setEditRow] = useState({});
  const [edited, setEdited] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [idx, setIdx] = useState(-1);
  const [id, setId] = useState("1");

  const handleArchiveClick = async (id, status, index) => {
    try {
      const endpoint = status === "archived" ? "unarchive" : "archive";
      await axios.put(`${API_URL}/pharmacist/${endpoint}/${id}`);
      console.log(rows);
      dispatch(archive(index));
      // Set the local state with the updated rows
    } catch (error) {
      console.error("Error toggling archive status:", error);
    }
  };
  useEffect(() => {}, [dispatch]);

  const handleEditClick = (row, index) => {
    setIsOpen(true);
    setEditRow(row);
    setId(row._id);
    console.log(id);
    setIdx(index);
  };

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

  return (
    <>
      <Dialog open={isOpen} onBackdropClick={() => setIsOpen(false)}>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-body">
            <label className="form__label" for="name">
              name
            </label>
            <input style={{ width: "92%" }} type="text" id="name" required value={editRow.name}/>
            <label for="activeElement" >Active element</label>
            <input type="text" id="activeElement" required value={editRow.activeElement} />
            <label for="use">Medicinal use</label>
            <input style={{ width: "92%" }} type="text" id="use" required value={editRow.use} />

            <label className="form__label" for="price">
              Price
            </label>
            <input
              type="number"
              id="price"
              required
              value={editRow.price}
              style={{ width: "94%", borderRadius: "3px" }}
            />

            <label className="form__label" for="amount">
              Available Quantity{" "}
            </label>
            <input
              type="number"
              id="amount"
              value={editRow.amount}

              required
              style={{ width: "94%", borderRadius: "3px" }}
            />

            <label className="form__label" htmlFor="imgFile">
              Image File
            </label>
            <input
              required
              type="file"
              id="imgFile"
              name="imgFile"
              accept="image/*"
              

              onChange={handleFileChange}
              style={fileInputStyle}
            />

            <img
              src={imgUrl}
              alt="Uploaded Preview"
              style={{ maxWidth: "100%", maxHeight: "200px" }}
            />

            <label htmlFor="imgFile" style={uploadButtonStyle}>
              Upload Image
            </label>
          </div>
          <div className="footer">
            <button type="submit" class="btn">
              Edit
            </button>
          </div>
        </form>
      </Dialog>
      <TableContainer component={Paper} style={tableContainerStyle}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
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
                Use
              </TableCell>
              <TableCell
                align="right"
                sx={{ fontWeight: "bold", fontSize: "20px" }}
              >
                Active Elements
              </TableCell>
              <TableCell
                align="right"
                sx={{ fontWeight: "bold", fontSize: "20px" }}
              >
                Amount
              </TableCell>
              <TableCell
                align="right"
                sx={{ width: "20%", fontWeight: "bold", fontSize: "20px" }}
              >
                Image Link
              </TableCell>
              <TableCell
                align="right"
                sx={{ fontWeight: "bold", fontSize: "20px" }}
              >
                archive?
              </TableCell>

              <TableCell
                align="right"
                sx={{ fontWeight: "bold", fontSize: "20px" }}
              >
                sales
              </TableCell>
              <TableCell
                align="right"
                sx={{ fontWeight: "bold", fontSize: "20px" }}
              >
                Edit
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows
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
              .map(
                (row, index) => (
                  console.log(row.imgurl),
                  (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ fontSize: "18px" }}
                      >
                        {row.name}
                      </TableCell>
                      <TableCell align="right" sx={{ fontSize: "18px" }}>
                        {row.price}
                      </TableCell>
                      <TableCell align="right" sx={{ fontSize: "18px" }}>
                        {row.use}
                      </TableCell>
                      <TableCell align="right" sx={{ fontSize: "18px" }}>
                        {row.activeElement}
                      </TableCell>
                      <TableCell align="right" sx={{ fontSize: "18px" }}>
                        {row.amount}
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{ paddingRight: "4px", fontSize: "15px" }}
                      >
                        <TableCell align="right" sx={{}}>
                          {/* Display the image directly */}
                          <img
                            src={`/public/${row.imgurl}`}
                            alt="medicine"
                            style={{
                              width: "70%",
                              height: "70%",
                            }}
                            onClick={() => handleImageViewerOpen(row.imgurl)}
                          />
                        </TableCell>
                      </TableCell>
                      <TableCell>
                        <Button
                          style={{ width: "80%", marginLeft: "20%" }}
                          variant="contained"
                          color={
                            row.status === "archived" ? "secondary" : "primary"
                          }
                          onClick={() =>
                            handleArchiveClick(row._id, row.status, index)
                          }
                        >
                          {row.status === "archived" ? "Unarchive" : "Archive"}
                        </Button>
                      </TableCell>
                      <TableCell align="right" sx={{ fontSize: "18px" }}>
                        {row.sales}
                      </TableCell>
                      <TableCell align="right" sx={{ fontSize: "18px" }}>
                        {" "}
                        <Button
  style={{ width: "80%", marginLeft: "20%", backgroundColor: "#355E3B", color: "white" }}
  variant="contained"
  onClick={() => handleEditClick(row, index)}
>
  Edit
</Button>
                      </TableCell>
                    </TableRow>
                  )
                )
              )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
