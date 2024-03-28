'use client';

import { Box, Button } from '@mui/material';
import { useContext } from 'react';
import { LeaveReqCreationContext } from '../providers/LeaveReqCreationProvider';
import { CreateLeaveReqModal } from '../_components';

export const CreateLeaveReqMain = () => {
  const { setIsOpen } = useContext(LeaveReqCreationContext);

  const handleOpen = () => setIsOpen(true);

  return (
    <Box>
      <Button onClick={handleOpen}>Чөлөөний хуудас бөглөх</Button>
      <CreateLeaveReqModal />
    </Box>
  );
};
