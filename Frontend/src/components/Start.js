import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";

export default function Start() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{display: 'flex', gap: '10px',  width: '100%'}}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 'auto' }}
          >
            <MenuIcon />
          </IconButton>

          <NavLink exact to="/Login">
            <Button sx={{color: 'white'}}>Login</Button>
          </NavLink>

          <NavLink exact to="/RegisterAs">
            <Button sx={{color: 'white'}} color="inherit">Register</Button>
          </NavLink>

        </Toolbar>
      </AppBar>
    </Box>
  );
}
