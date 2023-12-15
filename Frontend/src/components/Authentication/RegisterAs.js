import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import SickIcon from "@mui/icons-material/Sick";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import { useNavigate } from "react-router-dom";

const RegisterOptions = ({ open, onClose }) => {
  const navigate = useNavigate();

  const handlePatientClick = () => {
    navigate("/RegisterAsPatient");
    onClose();
  };

  const handleDoctorClick = () => {
    navigate("/RegisterAsPharmacist");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Register As</DialogTitle>
      <DialogContent>
      
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            startIcon={<SickIcon />}
            onClick={handlePatientClick}
          >
            Patient
          </Button>
          <Button
            variant="contained"
            endIcon={<VaccinesIcon />}
            onClick={handleDoctorClick}
          >
            Pharmacist
          </Button>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default RegisterOptions;
