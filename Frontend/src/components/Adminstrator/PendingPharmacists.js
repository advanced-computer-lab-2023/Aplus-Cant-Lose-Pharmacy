import React, { useEffect, useState ,useContext} from "react";
import { SnackbarContext } from "../../App";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { viewPendPh, acceptPh, rejectPh } from "../../features/adminSlice";

const JoinRequests = () => {
  const snackbarMessage = useContext(SnackbarContext);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(viewPendPh());
  }, [dispatch]);
  const dummyData = useSelector((state) => state.admin.phpending);
  const handleDelete = (requestId) => {};

  const handleApprove = (id) => {
    const responseData =  dispatch(acceptPh(id));
    if (responseData === undefined) {
      snackbarMessage(`error: username already exist has occurred`, "error");
    } else {
      snackbarMessage("Email sent to accepted Pahrmacist", "success");
    }
  };
  const handleReject = (id) => {
    const responseData = dispatch(rejectPh(id));
    if (responseData === undefined) {
      snackbarMessage(`error: username already exist has occurred`, "error");
    } else {
      snackbarMessage("Email sent to rejected Pahrmacist", "success");
    }
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
                    onClick={() => handleApprove(request._id)}
                    variant="contained"
                    color="primary"
                  >
                    Approve
                  </Button>
                  <Button
                    onClick={() => handleReject(request._id)}
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
