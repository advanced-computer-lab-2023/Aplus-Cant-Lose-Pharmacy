import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { viewPendPh } from '../../features/adminSlice';

const JoinRequests = () => {
  const dispatch=useDispatch();
  useEffect(() => {
    dispatch(viewPendPh())
  }, [dispatch]);
  const dummyData =  useSelector((state) => state.admin.phpending);
  const handleDelete = (requestId) => {
    
  };

  const handleApprove = (requestId) => {
    // Implement logic to approve the join request and update the server
    // You can remove or modify this function according to your actual needs
  };

  const handleReject = (requestId) => {
    // Implement logic to reject the join request and update the server
    // You can remove or modify this function according to your actual needs
  };

  return (
    <div>
      <h1>Join Requests</h1>
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
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dummyData.map((request) => (
              <TableRow key={request.id}>
                <TableCell>{request.name}</TableCell>
                <TableCell>{request.email}</TableCell>
                <TableCell>{request.username}</TableCell>
                <TableCell>{request.gender}</TableCell>
                <TableCell>{request.status}</TableCell>
                <TableCell>{request.rate}</TableCell>
                <TableCell>{request.affilation}</TableCell>
                <TableCell>{request.background}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleApprove(request.id)}
                    variant="contained"
                    color="primary"
                  >
                    Approve
                  </Button>
                  <Button
                    onClick={() => handleReject(request.id)}
                    variant="contained"
                    color="secondary"
                  >
                    Reject
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
