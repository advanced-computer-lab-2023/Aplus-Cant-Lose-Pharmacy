import React, { useState } from 'react';
import './AddPackageForm.css'

const AddPackageForm = ({ onAdd, onCancel }) => {
  const [packageName, setPackageName] = useState('');
  const [price, setPrice] = useState(0);
  const [doctorDiscount, setDoctorDiscount] = useState(0);
  const [medicineDiscount, setMedicineDiscount] = useState(0);
  const [familyDiscount, setFamilyDiscount] = useState(0);


  const handleAddPackage = () => {
    // Create a package object with the form values
    const newPackage = {
      name: packageName,
      price: parseFloat(price),
      doctorDiscount: parseFloat(doctorDiscount),
      medicineDiscount: parseFloat(medicineDiscount),
      familyDiscount: parseFloat(familyDiscount),
    };

    // Call the onAdd callback with the new package data
    onAdd(newPackage);

    // Clear the form fields
    setPackageName('');
    setPrice(0);
    setDoctorDiscount(0);
    setMedicineDiscount(0);
    setFamilyDiscount(0);
  };

  return (
    <div className="add-package-form">
      <h2>Add New Package</h2>
      <label>
        Package Name:
        <input
          type="text"
          value={packageName}
          onChange={(e) => setPackageName(e.target.value)}
        />
      </label>
      <label>
        Price:
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </label>
      <label>
        Doctor Discount (%):
        <input
          type="number"
          value={doctorDiscount}
          onChange={(e) => setDoctorDiscount(e.target.value)}
        />
      </label>
      <label>
        Medicine Discount (%):
        <input
          type="number"
          value={medicineDiscount}
          onChange={(e) => setMedicineDiscount(e.target.value)}
        />
      </label>
      <label>
        Family Discount (%):
        <input
          type="number"
          value={familyDiscount}
          onChange={(e) => setFamilyDiscount(e.target.value)}
        />
      </label>
      <div className="button-container">
        <button onClick={handleAddPackage}>Add</button>
        <button onClick={()=>{onCancel("VIEW_Health_Package")}}>Cancel</button>
      </div>
    </div>
  );
};

export default AddPackageForm;
