// Patient.js

import React from 'react';
import './Patient.css'; // Import your CSS file for styling

const Patient = ({ username, onRemove }) => {
  return (
    <div className="patient">
      <p>{username}</p>
      <button onClick={onRemove}>Remove</button>
    </div>
  );
};

export default Patient;
