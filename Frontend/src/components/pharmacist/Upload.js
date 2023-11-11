import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from "../../Consts.js";
import { useSelector } from 'react-redux';

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const inputStyle = {
  margin: '10px 0',
  padding: '10px',
  border: '1px solid #ddd',
  borderRadius: '5px',
};

const buttonStyle = {
  margin: '15px 0',
  padding: '15px',
  backgroundColor: '#4CAF50',
  width: '15%',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

function Upload() {
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
      })
      .catch((error) => {
        console.error(error);
        alert('Error uploading files. Please try again.');
      });
  };

  return (
    <div style={containerStyle}>
      <h1>File Uploader</h1>
      <div style={inputStyle}>
        <label>ID File:</label>
        <input type="file" onChange={(e) => handleFileChange(e, 'id')} />
      </div>
      <div style={inputStyle}>
        <label>Degree File:</label>
        <input type="file" onChange={(e) => handleFileChange(e, 'degree')} />
      </div>
      <div style={inputStyle}>
        <label>License File:</label>
        <input type="file" onChange={(e) => handleFileChange(e, 'license')} />
      </div>
      <button style={buttonStyle} onClick={uploadFiles}>Upload Files</button>
    </div>
  );
}

export default Upload;
