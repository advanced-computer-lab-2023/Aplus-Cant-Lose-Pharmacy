import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  Avatar,
} from "@mui/material";
import ViewIcon from "@mui/icons-material/Visibility";

const ProfileModal = ({ user, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <>
      {children ? (
        <span onClick={handleOpen}>{children}</span>
      ) : (
        <IconButton
          onClick={handleOpen}
          style={{ position: "fixed", top: "230px", right: "10px" }}
        >
          <ViewIcon />
        </IconButton>
      )}
      <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle style={{ textAlign: "center" }}>
          <Typography variant="h4">{user.name}</Typography>
        </DialogTitle>
        <DialogContent dividers>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              alt={user.name}
              src={user.pic}
              sx={{ width: 150, height: 150 }}
            />
            <Typography variant="h6" style={{ fontFamily: "Work sans" }}>
              Email: {user.email}
            </Typography>
          </div>
        </DialogContent>
        <DialogActions style={{ justifyContent: "center" }}>
          <Button onClick={handleClose} variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProfileModal;
