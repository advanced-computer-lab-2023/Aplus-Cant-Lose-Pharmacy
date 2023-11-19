import React from 'react';
import { Box } from '@mui/material';
import './styles.css';
import SingleChat from './SingleChat';
import { ChatState } from '../Context/ChatProvider';

const Chatbox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();
console.log(selectedChat);
  return (
    <Box
      sx={{
     position: "fixed",
            top: "200px",
            right: "0px",
            width: "60%",
        display: { xs: selectedChat ? 'flex' : 'none', md: 'flex' },
        alignItems: 'center',
        flexDirection: 'column',
        padding: 3,
        backgroundColor: 'white',
    
        borderRadius: 'lg',
        borderWidth: '1px',
      }}
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}  />
    </Box>
  );
};

export default Chatbox;
