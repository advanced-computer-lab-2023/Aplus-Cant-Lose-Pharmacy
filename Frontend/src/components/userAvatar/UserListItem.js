import React from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { API_URL } from "../../Consts";

const UserListItem = ({ user, handleFunction }) => {
  console.log(user); // Logging the 'user' variable outside JSX

  return (
    <Box

      onClick={(handleFunction)}
      cursor="pointer"
      bgcolor="#E8E8E8"
      sx={{
        '&:hover': {
          background: '#38B2AC',
          color: 'white',
        },
      }}
      width="100%"
      display="flex"
      alignItems="center"
      color="black"
      px={3}
      py={2}
      mb={2}
      borderRadius="lg"
    >
      <Avatar mr={2} sx={{ cursor: 'pointer' }} alt={user.name} src={user.pic} />
      <Box>
        <Typography variant="body1">{user.name}</Typography>
        <Typography variant="caption">
          <b>Email:</b> {user.email}
        </Typography>
      </Box>
    </Box>
  );
};

export default UserListItem;
