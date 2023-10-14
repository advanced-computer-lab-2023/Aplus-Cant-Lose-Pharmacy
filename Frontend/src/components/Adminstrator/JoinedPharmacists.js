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

const JoinedPharmacist = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(viewJoinedPh())
  }, [dispatch]);
  const dummyData = useSelector((state) => state.admin.phJoined);


  const handleDelete = (id) => {
    ///dispatch delete from db> then the fullfilled delete from the current status 
    dispatch(deleteJPharmacist(id));

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
