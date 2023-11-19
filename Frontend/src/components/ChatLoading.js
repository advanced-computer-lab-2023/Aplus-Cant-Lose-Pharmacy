import React from 'react';
import { Stack, Skeleton } from '@mui/material';

const ChatLoading = () => {
  return (
    <Stack spacing={2}>
      {[...Array(12)].map((_, index) => (
        <Skeleton key={index} height={45} />
      ))}
    </Stack>
  );
};

export default ChatLoading;
