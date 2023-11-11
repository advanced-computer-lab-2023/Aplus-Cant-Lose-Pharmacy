import React, { useState, useContext } from "react";
import "../Authentication/styleRegister.css";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../Consts.js";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addMedicine } from "../../features/pharmacistSlice";
import { SnackbarContext } from "../../App";

const AddMedicine = (params) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const snackbarMessage = useContext(SnackbarContext);

  const [imgUrl, setImgUrl] = useState(""); // Add this line

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImgUrl(reader.result);
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
      .then((uploadResponse) => { // Renamed to uploadResponse
        const imgText = uploadResponse.data;
        const sampleData = {
          activeElement: event.target.elements.activeElement.value,
          price: event.target.elements.price.value,
          use: event.target.elements.use.value,
          name: event.target.elements.name.value,
          amount: event.target.elements.amount.value,
          imgurl: imgText, // Use the text received from the backend
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
  
  return (
    
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
        <input type="number" id="price" required  style={{width:"94%",borderRadius:"3px"}} />

      

        <label className="form__label" for="amount">
          Available Quantity{" "}
        </label>
        <input type="number" id="amount" required style={{width:"94%",borderRadius:"3px"}} />

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
        />
      </div>
      <div className="footer">
        <button type="submit" class="btn">
          Add
        </button>
      </div>
    </form>
  );
};

export default AddMedicine;
