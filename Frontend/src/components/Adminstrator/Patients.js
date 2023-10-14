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
import { viewPatients ,deletePatient} from '../../features/adminSlice';

const JoinRequests = () => {
  const dispatch=useDispatch();
  useEffect(() => {
    dispatch(viewPatients())
  }, [dispatch]);
  const dummyData =  useSelector((state) => state.admin.patients);

  const handleDelete = (requestId) => {

    dispatch(deletePatient(requestId));

  };

  return (
    <div>
      <h1>Patients</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>mobile</TableCell>
              <TableCell>EmergencyContact</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dummyData.map((request) => (
              <TableRow key={request._id}>
                <TableCell>{request.name}</TableCell>
                <TableCell>{request.email}</TableCell>
                <TableCell>{request.username}</TableCell>
                <TableCell>{request.gender}</TableCell>
                <TableCell>{request.mobile}</TableCell>
                <TableCell>
                        {request.emergencyContact.fullName}, 
                        {request.emergencyContact.mobile}, 
                        {request.emergencyContact.relation}
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

export default JoinRequests;
