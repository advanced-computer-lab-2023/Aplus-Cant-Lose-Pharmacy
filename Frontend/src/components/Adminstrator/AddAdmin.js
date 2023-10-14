import React, { useState } from 'react';
import './AddAdmin.css';
import {createAdmin} from '../../features/adminSlice'
import { useDispatch, useSelector } from 'react-redux';
import  { useEffect ,useContext} from 'react';
import { SnackbarContext } from "../../App";
import { useNavigate } from "react-router-dom";

const AddAdmin = ({ onSave, onCancel }) => {
  const dispatch=useDispatch();
  const snackbarMessage = useContext(SnackbarContext);
  const navigate = useNavigate();
  
  const [adminData, setAdminData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminData({ ...adminData, [name]: value });
  };

  const handleSave = (event) => {
    event.preventDefault();

    const sampleData = {
    username:event.target.elements.username.value,
    password:event.target.elements.password.value
    };

    console.log(sampleData);

    const response = dispatch(createAdmin(sampleData));
    response.then((responseData) => {
      console.log(responseData);
      if (responseData.payload===undefined) {
        snackbarMessage(`error: username already exist has occurred`, "error");
      } else {
    
        snackbarMessage("You have successfully added", "success");
        navigate("/Home");
      }
    });
  };
  const handleCancel = () => {
    console.log("cancel");
    onCancel("Nothing");

  };

  return (
    <div className="admin-form">
      <h2>Add Administrator</h2>
      <form onSubmit={handleSave}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={adminData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={adminData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="button-group">
          <button type="submit" >Add</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddAdmin;