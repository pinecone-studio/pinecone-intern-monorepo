'use client';

import { Box, Button } from '@mui/material';
import { useContext } from 'react';
import { CreateLeaveReqModal } from '../_components';
import { LeaveReqCreationContext } from '../../../common';

export const CreateLeaveReqMain = () => {
  const { setIsOpen } = useContext(LeaveReqCreationContext);

  const handleOpen = () => setIsOpen(true);

  return (
    <Box>
      <Button data-cy="open-request" onClick={handleOpen}>
        Чөлөөний хуудас бөглөх
      </Button>
      <CreateLeaveReqModal />
    </Box>
  );
};
