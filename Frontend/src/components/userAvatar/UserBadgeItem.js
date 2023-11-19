import React from 'react';
import { Badge, IconButton, Typography } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

const UserBadgeItem = ({ user, handleFunction, admin }) => {
  return (
    <Badge
      sx={{
        px: 2,
        py: 1,
        borderRadius: 'lg',
        m: 1,
        mb: 2,
        variant: 'standard',
        fontSize: 12,
        color: 'purple',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
      onClick={handleFunction}
      component="div"
    >
      <Typography>{user.name}</Typography>
      {admin === user._id && <Typography>(Admin)</Typography>}
      <IconButton size="small">
        <CloseIcon />
      </IconButton>
    </Badge>
  );
};

export default UserBadgeItem;
