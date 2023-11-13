import React, { useState, useEffect, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { changePass } from "../../features/userSlice";
import { SnackbarContext } from "../../App";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../features/userSlice";

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
};

const avatarStyles = {
};

const logoutButtonStyles = {
  marginLeft: "0px",
  textDecoration: "none",
  postion: "absolute",
  right: "0px",
  width: "10%",
  padding: "0px",
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
  const [openDialog, setOpenDialog] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emptyFieldError, setEmptyFieldError] = useState(false);

  useEffect(() => {}, [dispatch]);

  const isPasswordValid = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
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

  const savePassword = () => {
    if (currentPassword === "" || newPassword === "" || confirmNewPassword === "") {
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
      setPasswordError("Password must be at least 8 characters, contain an uppercase letter, and a special character (@#$%^&+=)");
      return;
    }

    console.log("Password changed");
    const response = dispatch(changePass({ oldPassword: currentPassword, newPassword, username }));
    if (response === undefined) {
      snackbarMessage("Incorrect old Password", "error");
    } else {
      snackbarMessage("You have successfully added", "success");
    }
    closeChangePasswordDialog();
  };

  return (
    <div sx={containerStyles}>
      <Avatar src="/path-to-your-avatar-image.jpg" sx={avatarStyles} onClick={handleAvatarClick} />
      <Typography component="span" onClick={handleAvatarClick} sx={myAccountStyles}>
        Account
      </Typography>
      <Button style={logoutButtonStyles} onClick={handleLogout}>
        Logout
      </Button>
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
          <ListItem button onClick={openChangePasswordDialog}>
            Change Password
          </ListItem>
        </List>
      </Popover>
      <Dialog open={openDialog} onClose={closeChangePasswordDialog}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <TextField
            label="Current Password"
            type="password"
            fullWidth
            margin="normal"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <TextField
            label="New Password"
            type="password"
            fullWidth
            margin="normal"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <TextField
            label="Confirm New Password"
            type="password"
            fullWidth
            margin="normal"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            required
            error={emptyFieldError || passwordError !== ""}
            helperText={emptyFieldError ? "Must enter a value" : passwordError}
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
