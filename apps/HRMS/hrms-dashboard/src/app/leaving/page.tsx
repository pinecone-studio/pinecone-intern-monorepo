'use client';

import { useRouter } from 'next/navigation';
import Requests from './_features/Requests';
import { Stack } from '@mui/material';
import { CreateLeaveRequestMain } from './_features';

const LeavingPage = () => {
  const router = useRouter();
  const handleNavigateToHomePageButton = () => router.push('/');

  return (
    <div>
      <h1>hello from HRMS dashboard Leaving Page</h1>
      <h1>hello from Leaving Service Query</h1>
      <Requests />
      <button onClick={handleNavigateToHomePageButton}>Go back to home page</button>
    </div>
    <Stack gap={'24px'} sx={{ paddingTop: '32px', paddingX: '32px', width: '100%', bgcolor: '#F7F7F8' }}>
      <CreateLeaveRequestMain />
    </Stack>

  );
};

export default LeavingPage;