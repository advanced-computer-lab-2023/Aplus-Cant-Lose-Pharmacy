import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { NavLink } from "react-router-dom";
import hi from "../hi.png";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LoginIcon from '@mui/icons-material/Login';
import RegisterOptions from "./Authentication/RegisterAs"; // Import the RegisterOptions component

export default function Start() {
  const [openRegisterDialog, setOpenRegisterDialog] = React.useState(false);

  const handleOpenRegisterDialog = () => {
    setOpenRegisterDialog(true);
  };

  const handleCloseRegisterDialog = () => {
    setOpenRegisterDialog(false);
  };

  return (
    <Box sx={{ flexGrow: 1, color: "white" }}>
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex',ml:"auto",mr:"60px" }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 'auto' }}
          >
          </IconButton>

          <NavLink exact to="/Login">
            <Button sx={{ color: 'white', fontSize: "25px" }} varient="contained" startIcon={<LoginIcon />}>Login</Button>
          </NavLink>

          <Button sx={{ color: 'white', fontSize: "20px", ml: "30px" }} color="inherit" startIcon={<AppRegistrationIcon />} onClick={handleOpenRegisterDialog}>
            Register
          </Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ ml: "27%" }}>
        <img src={hi} alt="hi" border="0" style={{ height: '900px' }} />
        {/* Add content or components below the image if needed */}
      </Box>

      {/* Render the RegisterOptions dialog */}
      <RegisterOptions open={openRegisterDialog} onClose={handleCloseRegisterDialog} />
    </Box>
  );
}
