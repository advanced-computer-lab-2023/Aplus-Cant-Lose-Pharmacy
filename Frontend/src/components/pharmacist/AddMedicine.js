import React, { useState, useContext } from "react";
import "../Authentication/styleRegister.css";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../Consts.js";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import { addMedicine } from "../../features/pharmacistSlice";
import { SnackbarContext } from "../../App";
import Error from "../../Error";
const uploadButtonStyle = {
  backgroundColor: "#4CAF50",
  color: "white",
  padding: "10px 15px",
  borderRadius: "5px",
  cursor: "pointer",
  marginTop: "10px",
  width: "20%", // Add margin-top for spacing
};
const AddMedicine = (params) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const snackbarMessage = useContext(SnackbarContext);
  const { role } = useSelector((state) => state.user);

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
          imgurl: imgText, // Use the text received from the backend
          type: event.target.elements.type.value,
        };

        const addMedicineResponse = dispatch(addMedicine(sampleData)); // Renamed to addMedicineResponse
        addMedicineResponse.then((responseData) => {
          if (responseData.payload.status < 300) {
            snackbarMessage("You have successfully added", "success");
            navigate("/Home");
          } else {
            snackbarMessage(`error: ${responseData} has occurred`, "error");
          }
        });
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };
  const fileInputStyle = {
    display: "none",
  };
  return role === "pharmacist" ? (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-body">
        <label className="form__label" for="name">
          name
        </label>
        <input style={{ width: "92%" }} type="text" id="name" required />
        <label for="activeElement">Active element</label>
        <input type="text" id="activeElement" required />
        <label for="use">Medicinal use</label>
        <input style={{ width: "92%" }} type="text" id="use" required />

        <label className="form__label" for="price">
          Price
        </label>
        <input
          type="number"
          id="price"
          required
          style={{ width: "94%", borderRadius: "3px" }}
        />

        <label className="form__label" for="amount">
          Available Quantity{" "}
        </label>
        <input
          type="number"
          id="amount"
          required
          style={{ width: "94%", borderRadius: "3px" }}
        />

        <label className="form__label" for="type">
          Type{" "}
        </label>
        <select
          id="type"
          required
          style={{ width: "94%", borderRadius: "3px" }}
        >
          <option value="Prescription">Prescription</option>
          <option value="Over the counter">Over the counter</option>
        </select>
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
          Add
        </button>
      </div>
    </form>
  ) : (
    <>
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

export default AddMedicine;
