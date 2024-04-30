'use client';

import { Stack } from '@mui/material';
import { CreateLeaveReqMain } from './_features';

const LeavingPage = () => {
  return (
    <Stack gap={'24px'} sx={{ paddingTop: '32px', paddingX: '32px', width: '100%', bgcolor: '#F7F7F8' }}>
      <CreateLeaveReqMain />
    </Stack>
  );
};

export default LeavingPage;
