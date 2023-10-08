import React, { useState } from 'react';
import './AddAdmin.css';

const AddAdmin = ({ onSave, onCancel }) => {
  const [adminData, setAdminData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminData({ ...adminData, [name]: value });
  };

  const handleSave = () => {
    console.log("save")
    // onSave(adminData);
  };
  const handleCancel = () => {
    console.log("cancel");
    onCancel("Nothing");

  };

  return (
    <div className="admin-form">
      <h2>Add Administrator</h2>
      <form>
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
          <button type="button" onClick={handleSave}>Save</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddAdmin;
