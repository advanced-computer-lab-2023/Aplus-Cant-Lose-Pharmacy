import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { viewJoinedPh, deleteJPharmacist } from '../../features/adminSlice';
import download from "downloadjs"; // Import download function
import axios from "axios";
import { API_URL } from "../../Consts.js";

const JoinedPharmacist = () => {
  const dispatch = useDispatch();
  const {id} = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(viewJoinedPh())
    console.log(id)
  }, [dispatch]);
  const dummyData = useSelector((state) => state.admin.phJoined);


  const handleDelete = (id) => {
    ///dispatch delete from db> then the fullfilled delete from the current status 
    dispatch(deleteJPharmacist(id));

  };
  const handleDownload = async (drId) => {
    try {
      const response = await axios.get(
        `${API_URL}/pharmacist/downloadf/${drId}`,
        {
          responseType: "blob",
        }
      );
  
      // Extract filename from the Content-Disposition header
      const contentDisposition = response.headers["content-disposition"];
      const filenameMatch = contentDisposition.match(/filename="(.+)"/);
      const filename = filenameMatch ? filenameMatch[1] : "files.zip";
  
      // Download the file using the downloadjs library
      download(response.data, filename, response.headers["content-type"]);
    } catch (error) {
      console.error("Error downloading files:", error);
      // Handle error, e.g., show an error message to the user
    }
  };

  return (
    <div>
      <h1>Pharmacists</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Rate</TableCell>
              <TableCell>affilation</TableCell>
              <TableCell>Background</TableCell>
              <TableCell>documents</TableCell>

              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {dummyData.map((request) => (
              <TableRow key={request._id}>
                <TableCell>{request.name}</TableCell>
                <TableCell>{request.email}</TableCell>
                <TableCell>{request.username}</TableCell>
                <TableCell>{request.gender}</TableCell>
                <TableCell>{request.status}</TableCell>
                <TableCell>{request.rate}</TableCell>
                <TableCell>{request.affilation}</TableCell>
                <TableCell>{request.background}</TableCell>
                <TableCell><Button
                    onClick={() => handleDownload(request._id)}
                    variant="contained"
                    color="primary"
                  >
                    Download
                  </Button>
                </TableCell>

                <TableCell>
                  <Button
                    onClick={() => handleDelete(request._id)}
                    variant="contained"
                    color="primary"
                  >
                    Delete
                  </Button>
                
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default JoinedPharmacist;
