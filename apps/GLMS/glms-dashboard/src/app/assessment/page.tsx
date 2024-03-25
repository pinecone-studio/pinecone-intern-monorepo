'use client';

import { useRouter } from 'next/navigation';
import { AssessmentMain } from './_features';

const AssessmentPage = () => {
  const router = useRouter();

  const handleNavigateToHomePageButton = () => router.push('/');

  return (
    <>
      <div>
        <h1>hello from GLMS dashboard Assessment Page</h1>
        <AssessmentMain />
        <button onClick={handleNavigateToHomePageButton}>
          Go back to home page
        </button>
      </div>
    </>
  );
};

export default AssessmentPage;
