// PharmacistList.js

import React from 'react';
import './PharmacistList.css'; // Import your CSS file for styling
import Pharmacist from './Pharmacist'; // Assuming you have a Pharmacist component

const PharmacistList = ({ pharmacists, onRemove }) => {
  return (
    <div className="pharmacist-list">
      <h2>Pharmacists List</h2>
      {pharmacists.map((pharmacist, index) => (
        <Pharmacist key={index} username={pharmacist.username} onRemove={() => onRemove(index)} />
      ))}
    </div>
  );
};

export default PharmacistList;
