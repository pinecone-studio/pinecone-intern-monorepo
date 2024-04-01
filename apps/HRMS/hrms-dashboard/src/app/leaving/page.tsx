'use client';

import { useRouter } from 'next/navigation';
import { useHelloQueryFromLeavingServiceQuery } from '../../generated';
import { LeavingMain } from './_features';

const LeavingPage = () => {
  const { data } = useHelloQueryFromLeavingServiceQuery();
  const router = useRouter();

  const handleNavigateToHomePageButton = () => router.push('/');

  return (
    <div>
      <h1>hello from HRMS dashboard Leaving Page</h1>
      <h1>
        hello from Leaving Service Query
        {data?.helloQueryFromLeavingService}
      </h1>
      <LeavingMain />
      <button onClick={handleNavigateToHomePageButton}>Go back to home page</button>
    </div>
  );
};

export default LeavingPage;
