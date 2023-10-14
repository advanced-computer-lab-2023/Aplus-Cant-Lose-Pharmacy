
import { addPatient } from "../../features/patientSlice";
import { useNavigate } from "react-router-dom";
import React, { useState, useContext } from "react";
import "./styleRegister.css";
import { useDispatch, useSelector } from "react-redux";
import { SnackbarContext } from "../../App";
function RegisterAsPatient() {


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const snackbarMessage = useContext(SnackbarContext);
  const handleSubmit = (event) => {
  
    event.preventDefault();
    const emergencyContact={

      fullName:event.target.elements.fullname.value,
      mobile:event.target.elements.mobile.value,
      relation:event.target.elements.relation.value
    }
    const sampleData = {
      name: event.target.elements.name.value,
      email: event.target.elements.email.value,
      username: event.target.elements.username.value,
      dBirth: event.target.elements.dBirth.value,
      gender: event.target.elements.gender.value,
      password: event.target.elements.password.value,
      emergencyContact:emergencyContact,
      mobile: event.target.elements.pmobile.value
    };

    const response = dispatch(addPatient(sampleData));
    response.then((responseData) => {
      console.log(responseData);
      if (responseData.payload.status < 300) {
        snackbarMessage("You have successfully registered", "success");
        navigate("/login");
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
        <label className="form__label" for="pmobile">
          mobile number
        </label>
        <input type="number" id="pmobile" required />

        <label for="gender">Gender</label>
        <select style={{ width: "92%" }} id="gender" name="Gender">
          <option value="male">male</option>
          <option value="female">female</option>
          <option value="none">none</option>
        </select>
        <label className="form__label" for="dBirth">
          Date of Birth
        </label>
        <input type="date" id="dBirth" required />
        <label className="form__label" style={{marginTop:'10px',marginBottom:'10px',marginLeft:'30%'}} for="dBirth">
          {" "}
          Emergency Contact{" "}
        </label>
        
        <label className="form__label" for="fullname">
          Full name
        </label>
        <input type="text" id="fullname" required />

        <label className="form__label" for="mobile">
          mobile number
        </label>
        <input type="number" id="mobile" required />

        <label className="form__label" for="relation">
          Relation to the patient
        </label>
        <input type="text" id="relation" required />

        <button type="submit" class="btn">
          Register
        </button>
      </div>
    </form>
  );
}
export default RegisterAsPatient;
