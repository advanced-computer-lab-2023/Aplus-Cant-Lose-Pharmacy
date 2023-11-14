import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from "../../Consts.js";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  width: '70%', // Adjust the width as needed
  margin: '50px auto', // Center-align the component
};
const inputStyle = {
  margin: '10px 0',
  fontSize: '30px', // Adjust the font size as needed
  padding: '10px',
  border: '1px solid #ddd',
  borderRadius: '5px',
  width: '80%', // Adjust the width as needed
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};



const fileInputStyle = {
  display: 'none',
};



const uploadButtonStyle = {
  margin: '15px 0',
  fontSize: '25px', // Adjust the font size as needed

  padding: '15px',
  backgroundColor: '#4463d4',
  width: '20%', // Adjust the width as needed
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};



const chooseFileButtonStyle = {
  backgroundColor: '#4CAF50',
  color: 'white',
  padding: '10px 15px',
  borderRadius: '5px',
  cursor: 'pointer',
  marginLeft: '10px', // Add left margin to the button
};

const filePathContainerStyle = {
  marginTop: '10px', // Adjust the margin as needed
  textAlign: 'left', // Align the text to the left
  fontSize: '14px', // Adjust the font size as needed
  display: 'flex', // Use flex display for alignment
  alignItems: 'center', // Center-align items vertically
};

const filePathStyle = {
  marginLeft: '10px',
};


function Upload() {

  const navigate = useNavigate();
  const [idFile, setIdFile] = useState(null);
  const [degreeFile, setDegreeFile] = useState(null);
  const [licenseFile, setLicenseFile] = useState(null);
  const id = useSelector(state => state.pharmacist.newPhId);

  const handleFileChange = (e, fileType) => {
    const file = e.target.files[0];

    switch (fileType) {
      case 'id':
        setIdFile(file);
        break;
      case 'degree':
        setDegreeFile(file);
        break;
      case 'license':
        setLicenseFile(file);
        break;
      default:
        break;
    }
  };

  const uploadFiles = () => {
    if (!idFile || !degreeFile || !licenseFile) {
      alert('Please select files for ID, Degree, and License');
      return;
    }

    const formData = new FormData();
    formData.append('files', idFile);
    formData.append('files', degreeFile);
    formData.append('files', licenseFile);

    axios.post(`${API_URL}/pharmacist/upload/${id}`, formData)
      .then((response) => {
        console.log(response);
        alert(response.data);
        navigate("/Login");
      })
      .catch((error) => {
        console.error(error);
        alert('Error uploading files. Please try again.');
      });
  };

  return (
    <div style={containerStyle}>
      <h1>Documents Uploader</h1>
      <div style={inputStyle}>
        <label>ID File:</label>
        <input
          type="file"
          style={fileInputStyle}
          onChange={(e) => handleFileChange(e, 'id')}
          id="idFileInput"
        />
        <label htmlFor="idFileInput" style={chooseFileButtonStyle}>
          Choose File
        </label>
        {idFile && (
          <div style={filePathContainerStyle}>
            <span>ID File: </span>
            <span style={filePathStyle}>{idFile.name}</span>
          </div>
        )}
      </div>

      <div style={inputStyle}>
        <label>Medical Degree File:</label>
        <input
          type="file"
          style={fileInputStyle}
          onChange={(e) => handleFileChange(e, 'degree')}
          id="degreeFileInput"
        />
        <label htmlFor="degreeFileInput" style={chooseFileButtonStyle}>
          Choose File
        </label>
        {degreeFile && (
          <div style={filePathContainerStyle}>
            <span>Medical Degree File: </span>
            <span style={filePathStyle}>{degreeFile.name}</span>
          </div>
        )}
      </div>

      <div style={inputStyle}>
        <label>Working License File:</label>
        <input
          type="file"
          style={fileInputStyle}
          onChange={(e) => handleFileChange(e, 'license')}
          id="licenseFileInput"
        />
        <label htmlFor="licenseFileInput" style={chooseFileButtonStyle}>
          Choose File
        </label>
        {licenseFile && (
          <div style={filePathContainerStyle}>
            <span>Working License File: </span>
            <span style={filePathStyle}>{licenseFile.name}</span>
          </div>
        )}
      </div>

      <button style={uploadButtonStyle} onClick={uploadFiles}>
        Upload Files
      </button>
    </div>
  );
}



export default Upload;
