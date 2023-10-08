


import React, { useState } from 'react';
import PackageCard from './PackageCard'; // Import your Package component here
import './PackageList.css'; // Import your CSS for styling


const PackageList = ({ packages, onAddPackageClick }) => {




  return (
    <div className="package-list">

     {packages.map((packageData, index) => (
        <PackageCard key={index} package={packageData} />
      ))}
     
    
      <button className="add-package-button" onClick={()=>onAddPackageClick('ADD_PACKAGE')}>
        Add Package
      </button>

      
    </div>
  );
};

export default PackageList;
