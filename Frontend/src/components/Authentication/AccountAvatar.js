// Import necessary libraries and constants
import React, { useState, useEffect, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Dialog from "@mui/material/Dialog";
import LockResetIcon from "@mui/icons-material/LockReset";
import LogoutIcon from "@mui/icons-material/Logout";

import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { changePass } from "../../features/userSlice";
import { SnackbarContext } from "../../App";
import WalletIcon from "@mui/icons-material/Wallet";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../features/userSlice";

import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { API_URL } from "../../Consts";
import {
  pharmacistGetWallet,
  getMedicinesWithZeroAmount,
} from "../../features/pharmacistSlice";
import AddAlertIcon from "@mui/icons-material/AddAlert";
import Badge from "@mui/material/Badge";

const popoverContentStyles = {
  fontWeight: "bold",
  color: "#0000A3", // Blue color
};

const myAccountStyles = {
  cursor: "pointer",
  fontSize: "1.3em",
  textDecoration: "underline",
  color: "#007bff",
  transition: "font-size 0.2s, text-decoration 0.2s",

  "&:hover": {
    fontSize: "1.5em",
    textDecoration: "none",
  },
  textAlign: "center",
};

const containerStyles = {
  display: "flex",
  alignItems: "center",
  height: "fit-content",
  width: "fit-content",
  backgroundColor: "whitesmoke",
  borderRadius: "7px",
  padding: "10px",
borderRadius: "7px",
  
};

const avatarStyles = {};

const logoutButtonStyles = {
  marginRight: "10px",

  textDecoration: "underline",
  position: "absolute", // Corrected typo in 'position'
  right: "0px",
  fontSize: "20px",
  padding: "0px",
  width: "fit-content",
  color: "#ff0000", // Red color
};

const AccountAvatar = () => {
  const snackbarMessage = useContext(SnackbarContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout())
      .then(() => {
        navigate("/Login");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  const { username } = useSelector((state) => state.user);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorel, setAnchorel] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emptyFieldError, setEmptyFieldError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [popoverAnchor, setPopoverAnchor] = useState(null);

  const handlePopoverOpen = (event) => {
    setPopoverAnchor(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setPopoverAnchor(null);
  };
  const handlePopoverwClose = () => {
    setAnchorel(null);
  };

  useEffect(() => {}, [dispatch]);

  const isPasswordValid = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlewallet = (event) => {
    setAnchorel(event.currentTarget);
  };

  const handleAvatarClose = () => {
    setAnchorEl(null);
  };

  const openChangePasswordDialog = () => {
    setOpenDialog(true);
    handleAvatarClose();
  };

  const closeChangePasswordDialog = () => {
    setOpenDialog(false);
    setPasswordError("");
    setEmptyFieldError(false);
  };

  const savePassword = async () => {
    if (
      currentPassword === "" ||
      newPassword === "" ||
      confirmNewPassword === ""
    ) {
      setEmptyFieldError(true);
      setPasswordError("");
      return;
    }

    if (newPassword === currentPassword) {
      setEmptyFieldError(false);
      setPasswordError("New password cannot be the same as the old password");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setEmptyFieldError(false);
      setPasswordError("New password and confirm password do not match");
      return;
    }

    if (!isPasswordValid(newPassword)) {
      setEmptyFieldError(false);
      setPasswordError(
        "Password must be at least 8 characters, contain an uppercase letter, and a special character (@#$%^&+=)"
      );
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/changePass/${username}`, {
        oldPassword: currentPassword,
        newPassword,
        username,
      });

      console.log("Response:", response);

      if (response.data.message) {
        snackbarMessage("Password has been changed", "success");
        closeChangePasswordDialog();
        dispatch(logout()).then(() => {
          navigate("/Login");
        });
      } else {
        snackbarMessage(
          `An error occurred: ${response.data.error || "Unknown error"}`,
          "error"
        );
      }
    } catch (error) {
      console.error("Error:", error.response.data);
      snackbarMessage(
        `An error occurred: ${error.response.data.error || "Unknown error"}`,
        "error"
      );
    }
  };
  const { id, role } = useSelector((state) => state.user);
  useEffect(() => {
    if (role === "pharmacist") {
      dispatch(pharmacistGetWallet({ id: id }));
      dispatch(getMedicinesWithZeroAmount());
    }
  }, [dispatch, role, id]);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleIconClick = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  const { wallet, alerts } = useSelector((state) => state.pharmacist);
  return (
    <div sx={containerStyles}>
      <Avatar
        src="/path-to-your-avatar-image.jpg"
        sx={avatarStyles}
        onClick={handleAvatarClick}
      />


      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogContent>Wallet details: {wallet}</DialogContent>
      </Dialog>
      <Typography
        component="span"
        onClick={handleAvatarClick}
        sx={myAccountStyles}
      >
        Account
      </Typography>

      {role === "pharmacist" && (
        <IconButton aria-label="cart" onClick={handlePopoverOpen} sx={{
          fontSize: '1rem', // Initial size
          '&:hover': {
            fontSize: '0.8rem', // Size on hover
          },
        }}>
          <Badge badgeContent={alerts.length} color="secondary">
            <AddAlertIcon />
          </Badge>
        </IconButton>
      )}
      <Popover
        open={Boolean(popoverAnchor)}
        anchorEl={popoverAnchor}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <List sx={popoverContentStyles}>
          {role === "pharmacist" && (
            <>
              <ListItem>
                {alerts.length === 0
                  ? "No medicines need restocking"
                  : "The following medicine(s) need restocking:"}
              </ListItem>
              {alerts.map((alert, index) => (
                <ListItem key={index}>{alert.name}</ListItem>
              ))}
            </>
          )}
        </List>
      </Popover>
      <IconButton>
      <WalletIcon sx={{ color: " #808080"}} onClick={handlewallet} /></IconButton>

      <Button style={logoutButtonStyles} onClick={handleLogout}           startIcon={<LogoutIcon />}
>
        Logout
      </Button>
      <Popover
        open={Boolean(anchorel)}
        anchorEl={anchorel}
        onClose={handlePopoverwClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        
        <List sx={popoverContentStyles}>
          {role === "pharmacist" && (
            <>
              <ListItem>
                   Wallet details: {wallet}
      
              </ListItem>
            
            </>
          )}
        </List>
      </Popover>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleAvatarClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <List>
        <ListItem>

<Typography sx={{fontSize:"15px"}}>username:</Typography> <Typography sx={{color:"blue",paddingLeft:"4px"}}>{username}</Typography>
          </ListItem>
          <ListItem button onClick={openChangePasswordDialog}             startIcon={<LockResetIcon />}
>
            
            Change Password
          </ListItem>
        </List>
      </Popover>
      <Dialog open={openDialog} onClose={closeChangePasswordDialog}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <TextField
            label="Current Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            margin="normal"
            onChange={(e) => setCurrentPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              ),
            }}
          />
          <TextField
            label="New Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            margin="normal"
            onChange={(e) => setNewPassword(e.target.value)}
            required
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              ),
            }}
          />
          <TextField
            label="Confirm New Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            margin="normal"
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            required
            error={emptyFieldError || passwordError !== ""}
            helperText={emptyFieldError ? "Must enter a value" : passwordError}
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              ),
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeChangePasswordDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={savePassword} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AccountAvatar;
