import React, { useState, useContext } from "react";
import "./styleRegister.css";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../Consts.js";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addPharmacist } from "../../features/pharmacistSlice";
import { SnackbarContext } from "../../App";

function RegisterAsPharmacist() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const snackbarMessage = useContext(SnackbarContext);
  const handleSubmit = (event) => {
    event.preventDefault();
    const sampleData = {
      name: event.target.elements.name.value,
      email: event.target.elements.email.value,
      username: event.target.elements.username.value,
      dBirth: event.target.elements.dBirth.value,
      gender: event.target.elements.gender.value,
      password: event.target.elements.password.value,
      rate: event.target.elements.rate.value,
      affilation: event.target.elements.affilation.value,
      background: event.target.elements.background.value,
    };

    console.log(sampleData);

    const response = dispatch(addPharmacist(sampleData));
    response.then((responseData) => {
      console.log(responseData);
      if (responseData.payload.status < 300) {
        snackbarMessage("You have successfully applied but please continue other documents uploads", "success");
        navigate("/Upload");
      } else {
        snackbarMessage(`error: ${responseData} has occurred`, "error");
      }
    });
  
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-body">
        <label for="username">Username</label>
        <input
          type="text"
          id="username"
          placeholder="Enter your username here..."
          required

        />

        <label className="form__label" for="name">
          Name
        </label>
        <input
          type="text"
          id="name"
          placeholder="Enter your full name here..."
          required
        />

        <label for="email">Email</label>
        <input
          style={{ width: "92%" }}
          type="email"
          id="email"
          placeholder="Enter your email address here..."
          required
        />

        <label className="form__label" for="password">
          Password
        </label>
        <input
          style={{ width: "92%" }}
          type="password"
          id="password"
          placeholder="Enter your password here..."
          required
        />

        <label for="gender">Gender</label>
        <select style={{ width: "92%" }} id="gender" name="Gender">
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="none">None</option>
        </select>

        <label className="form__label" for="dBirth">
          Date of Birth
        </label>
        <input type="date" id="dBirth" required />

        <label for="rate">Hourly Rate</label>
        <input
          style={{ width: "92%" }}
          type="number"
          id="rate"
          placeholder="10.00$"
          required
        />

        <label for="affilation">Affiliation(Hospital)</label>
        <input
          style={{ width: "92%" }}
          type="text"
          id="affilation"
          placeholder="Affiliation "
          required
        />

        <label for="background">Educational Background</label>
        <input
          style={{ width: "92%" }}
          type="text"
          id="background"
          placeholder="Educational Background"
          required
        />
      </div>
      <div className="footer">
        <button type="submit" class="btn">
          Register
        </button>
      </div>
    </form>
  );
}
export default RegisterAsPharmacist;
