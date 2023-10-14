import React, { useState, useContext } from "react";
import "../Authentication/styleRegister.css"
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
  const handleSubmit = (event) => {
    event.preventDefault();

    const sampleData = {
      activeElement: event.target.elements.activeElement.value,
      price: event.target.elements.price.value,
      use: event.target.elements.use.value,
      name: event.target.elements.name.value,
      amount: event.target.elements.amount.value,
      imgurl: event.target.elements.imgurl.value,
    };

    console.log(sampleData);

    const response = dispatch(addMedicine(sampleData));
    response.then((responseData) => {
      console.log(responseData);
      if (responseData.payload.status < 300) {
        snackbarMessage("You have successfully added", "success");
        navigate("/Home");
      } else {
        snackbarMessage(`error: ${responseData} has occurred`, "error");
      }
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

        <label for="imgurl">Image url</label>
        <input style={{ width: "92%" }} type="text" id="imgurl" required />
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
