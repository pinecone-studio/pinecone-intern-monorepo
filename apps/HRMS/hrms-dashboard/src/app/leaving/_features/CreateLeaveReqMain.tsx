'use client';

import { Box } from '@mui/material';
import { CreateLeaveReqModal } from '../_components';
import { HomePageHeader } from '../_components/HomePageHeader';

export const CreateLeaveReqMain = () => {
  return (
    <Box>
      <HomePageHeader />
      <CreateLeaveReqModal />
    </Box>
  );
};
