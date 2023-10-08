import React from 'react';
import './PackageCard.css';

const PackageCard = ({ name, type, price, doctorDiscount, medicineDiscount, familyDiscount }) => {
  return (
    <div className="package">
       
        <div className='Container1'>
            <div className='deleteBtn'>delete</div>
        </div>
        
        <div className='Container2'>
            <h3>Name: {name}</h3>
            <p>Type: {type} </p>
            <p>Price: {price} LE per year</p>
            <p>Doctor's Session Discount: {doctorDiscount}% off</p>
            <p>Medicine Discount: {medicineDiscount}% off</p>
            <p>Family Member Subscription Discount: {familyDiscount}% off</p>
      </div>
      
        
    </div>
  );
};

export default PackageCard;
