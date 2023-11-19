import React, { useEffect, useState } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { ChatState } from '../Context/ChatProvider';
import { getSender } from '../config/ChatLogics';
import ChatLoading from './ChatLoading';
import { API_URL } from '../Consts';
const MyChats = ({ fetchAgain }) => {
  const logId = useSelector(state => state.user.logId);
  const user = useSelector(state => state.user);
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, chats, setChats } = ChatState();
console.log("MyChats.js");
  const fetchChats = async () => {
    try {


      const { data } = await axios.get(`${API_URL}/chat/${logId}`);
      setChats(data);
    } catch (error) {
      console.error(error);
      // Handle error with toast or any other UI/UX element
    }
  };

  useEffect(() => {
    fetchChats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchAgain]);

  return (
    <Box
      sx={{
        display: { xs: selectedChat ? 'none' : 'flex', md: 'flex' },
        flexDirection: 'column',
        alignItems: 'center',
        padding: 3,
        backgroundColor: 'white',
        width: { xs: '100%', md: '31%' },
        borderRadius: 'lg',
        borderWidth: '1px',
      }}
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ xs: '28px', md: '30px' }}
        fontFamily="Work sans"
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        My Chats
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: 3,
          backgroundColor: '#F8F8F8',
          width: '100%',
          height: '100%',
          borderRadius: 'lg',
          overflowY: 'hidden',
        }}
      >
        {chats ? (
          <Stack sx={{ overflowY: 'scroll' }}>
            {chats.map(chat => (
              <Box
                onClick={() => setSelectedChat(chat)}
                key={chat._id}
                sx={{
                  cursor: 'pointer',
                  backgroundColor: selectedChat === chat ? '#38B2AC' : '#E8E8E8',
                  color: selectedChat === chat ? 'white' : 'black',
                  px: 3,
                  py: 2,
                  borderRadius: 'lg',
                }}
              >
                <Typography>
                  {!chat.isGroupChat ? getSender(user, chat.users) : chat.chatName}
                </Typography>
                {chat.latestMessage && (
                  <Typography variant="caption">
                    <b>{chat.latestMessage.sender.name} : </b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + '...'
                      : chat.latestMessage.content}
                  </Typography>
                )}
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
