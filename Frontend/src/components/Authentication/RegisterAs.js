import * as React from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import SickIcon from "@mui/icons-material/Sick";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import MedicationLiquidSharpIcon from "@mui/icons-material/MedicationLiquidSharp";
import { useNavigate } from "react-router-dom";
import { AutoFixNormal } from "@mui/icons-material";
const RegisterOptions = () => {
  const navigate= useNavigate();
  return (
    <div style={{marginTop:"15%",marginLeft:"40%"}}>
      <h3>Register As</h3>
    <Stack direction="row" spacing={4} >
      <Button variant="outlined" startIcon={<SickIcon />} onClick={() => {
        navigate("/RegisterAsPatient")
      }}>
        Patient
      </Button>
      <Button variant="contained" endIcon={<VaccinesIcon />} onClick={() => {
        navigate("/RegisterAsPharmacist")
      }}>
        Pharmacist
      </Button>
    </Stack>
    </div>
  );
};

export default RegisterOptions;
