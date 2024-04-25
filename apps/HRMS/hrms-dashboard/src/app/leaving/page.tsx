'use client';
import { useRouter } from 'next/navigation';
import RequestsMain from './_features/RequestsMain';

const LeavingPage = () => {
  const router = useRouter();
  const handleNavigateToHomePageButton = () => router.push('/');

  return (
    <div>
      <h1>hello from HRMS dashboard Leaving Page</h1>
      <h1>hello from Leaving Service Query</h1>
      <RequestsMain />
      <button onClick={handleNavigateToHomePageButton}>Go back to home page</button>
    </div>
  );
};

export default LeavingPage;
