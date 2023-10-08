// Pharmacist.js

import React from 'react';
import './Pharmacist.css'; // Import your CSS file for styling

const Pharmacist = ({ username, onRemove }) => {
  return (
    <div className="pharmacist">
      <p>{username}</p>
      <button onClick={onRemove}>Remove</button>
    </div>
  );
};

export default Pharmacist;
