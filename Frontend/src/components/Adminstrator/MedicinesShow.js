import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { viewMedicine } from '../../features/adminSlice';


const MedicineList = () => {
  const dispatch=useDispatch();
  useEffect(() => {
    dispatch(viewMedicine())
  }, [dispatch]);
  const dummyData =  useSelector((state) => state.admin.medicine);

 
  
  return (
    <div>
      <h1>Medicine List</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Active Element</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Use</TableCell>
              <TableCell>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dummyData.map((medicine) => (
              <TableRow
                key={medicine._id}
              
              >
                <TableCell>{medicine.name}</TableCell>
                <TableCell>{medicine.activeElement}</TableCell>
                <TableCell>{medicine.price}</TableCell>
                <TableCell>{medicine.use}</TableCell>
                <TableCell>{medicine.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
   
    </div>
  );
};

export default MedicineList;
