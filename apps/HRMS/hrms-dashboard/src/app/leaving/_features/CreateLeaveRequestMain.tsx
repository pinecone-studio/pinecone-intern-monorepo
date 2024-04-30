'use client';

import { Box } from '@mui/material';
import { CreateLeaveRequestModal } from '../_components';
import { HomePageHeader } from '../_components/HomePageHeader';

export const CreateLeaveRequestMain = () => {
  return (
    <Box sx={{ width: '100%' }}>
      <HomePageHeader />
      <CreateLeaveRequestModal />
    </Box>
  );
};
