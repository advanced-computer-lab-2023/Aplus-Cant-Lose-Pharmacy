


import React from 'react';
import './Sidebar.css';

const Sidebar = ({setActiveItem}) => {

  const selectItem = (activeItem)=>{
    setActiveItem(activeItem);
  };


  return (
    <div className="sidebar">
      <ul>
        <li onClick={() => selectItem('ADD_ADMIN')}>
          <a href="#">ADD ADMINISTRATOR</a>
        </li>

        <li onClick={() => selectItem('VIEW_REMOVE_ADMIN')}>
          <a href="#">VIEW/REMOVE ADMINISTRATOR</a>
        </li>


        <li onClick={() => selectItem('VIEW_Pharmacists_Join_Requests')}>
          <a href="#">VIEW Pharmacists join Requests</a>
        </li>


        <li onClick={() => selectItem('VIEW_REMOVE_Pharmacists')}>
          <a href="#">VIEW/REMOVE Pharmacists</a>
        </li>


        <li onClick={() => selectItem('VIEW_REMOVE_Patients')}>
          <a href="#">VIEW/REMOVE Patients list</a>
        </li>

        <li onClick={() => selectItem('VIEW_All_Medicine')}>
          <a href="#">VIEW all available medicines</a>
        </li>

        <li onClick={() => selectItem('VIEW_Health_Package')}>
          <a href="#">Health Packages</a>
        </li>

       
      </ul>
    </div>
  );
};

export default Sidebar;
