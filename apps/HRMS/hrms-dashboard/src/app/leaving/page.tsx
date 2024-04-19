'use client';
import { useRouter } from 'next/navigation';
import RequestsMain from './_features/RequestsMain';
import { LeavingMain } from './_features';

import Requests from './_features/Requests';

const LeavingPage = () => {
  const router = useRouter();

  const handleNavigateToHomePageButton = () => router.push('/');

  return (
    <div>
      <h1>hello from HRMS dashboard Leaving Page</h1>
      <h1>hello from Leaving Service Query</h1>
      <RequestsMain />
      {/* <LeavingMain /> */}
      <Requests />
      <button onClick={handleNavigateToHomePageButton}>Go back to home page</button>
    </div>
  );
};

export default LeavingPage;
