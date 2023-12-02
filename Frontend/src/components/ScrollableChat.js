import React, { useRef, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from '../config/ChatLogics';
import { useSelector } from 'react-redux';

const ScrollableChat = ({ messages }) => {
  const chatRef = useRef(null);
  const user = useSelector((state) => state.user);
  const logId = useSelector((state) => state.user.logId);

  useEffect(() => {
    // Scroll to the bottom of the chat when messages change
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  return (
    <div
      ref={chatRef}
      style={{
        overflowY: 'auto',
        maxHeight: '300px', // Set the maximum height as needed
        padding: '10px', // Add padding for better appearance
      }}
    >
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: 'flex' }} key={m._id}>
            {(isSameSender(messages, m, i, logId) ||
              isLastMessage(messages, i, logId)) && (
              <Tooltip title={m.sender.name} placement="bottom-start" arrow>
                <Avatar
                  sx={{ mt: '7px', mr: 1, cursor: 'pointer' }}
                  alt={m.sender.name}
                  src={m.sender.pic}
                />
              </Tooltip>
            )}
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === logId ? '#BEE3F8' : '#B9F5D0'
                }`,
                marginLeft: isSameSenderMargin(messages, m, i, logId),
                marginTop: isSameUser(messages, m, i, logId) ? 3 : 10,
                borderRadius: '20px',
                padding: '5px 15px',
                maxWidth: '75%',
              }}
            >
              {m.content}
            </span>
          </div>
        ))}
    </div>
  );
};

export default ScrollableChat;
