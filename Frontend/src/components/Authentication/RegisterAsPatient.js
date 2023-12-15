import { addPatient } from "../../features/patientSlice";
import { useNavigate } from "react-router-dom";
import React, { useState, useContext } from "react";
import "./styleRegister.css";
import { useDispatch, useSelector } from "react-redux";

import { SnackbarContext } from "../../App";
import { NavLink } from "react-router-dom";
function RegisterAsPatient() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const snackbarMessage = useContext(SnackbarContext);
  const handleSubmit = (event) => {
    event.preventDefault();
    const emergencyContact = {
      fullName: event.target.elements.fullname.value,
      mobile: event.target.elements.mobile.value,
      relation: event.target.elements.relation.value,
    };
    const sampleData = {
      name: event.target.elements.name.value,
      email: event.target.elements.email.value,
      username: event.target.elements.username.value,
      dBirth: event.target.elements.dBirth.value,
      gender: event.target.elements.gender.value,
      password: event.target.elements.password.value,
      emergencyContact: emergencyContact,
      mobile: event.target.elements.pmobile.value,
    };

    const response = dispatch(addPatient(sampleData));
    response.then((responseData) => {
      console.log(responseData);
      if (responseData.payload === undefined) {
        snackbarMessage(`error: ${responseData} has occurred`, "error");
      } else {
        snackbarMessage("You have successfully registered", "success");
        navigate("/login");
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
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
          placeholder="Enter your password here..."
          required
        />
        <label for="gender">Gender</label>
        <select style={{ width: "92%" }} id="gender" name="Gender">
          <option value="male">male</option>
          <option value="female">female</option>
          <option value="none">none</option>
        </select>
        <div>
          <label className="form__label" for="pmobile">
            mobile number
          </label>
          <input
            style={{ width: "94%" }}
            id="pmobile"
            type="number"
            name="phone"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            required
          />
        </div>

        <label className="form__label" for="dBirth">
          Date of Birth
        </label>
        <input class="dob-input" type="date" id="dBirth" required max="2001-12-31" style={{ width: "92%" }} />

        <h5 style={{ marginLeft: "30%" }}> Emergency Contact </h5>

        <label className="form__label" for="fullname">
          Full name
        </label>
        <input type="text" id="fullname" required />

        <label className="form__label" for="mobile">
          mobile number
        </label>
        <input style={{ width: "92%" }} type="number" id="mobile" required />

        <label style={{ width: "92%" }} className="form__label" for="relation">
          Relation to the patient
        </label>
        <input type="text" id="relation" required />

        <button
          type="submit"
          className="btn"
          style={{
            width: "30%",
            backgroundColor: "#4caf50", // Green background color
            color: "#fff", // White text color
            padding: "10px 20px", // Padding around the text
            fontSize: "16px", // Font size
            border: "none", // Remove border
            borderRadius: "5px", // Rounded corners
            cursor: "pointer", // Cursor style on hover
          }}
        >
          Register
        </button>
        <span style={{ marginLeft: "28%" }}>
          <NavLink to="/login">Already a user? Login</NavLink>
        </span>
      </div>
    </form>
  );
}
export default RegisterAsPatient;
