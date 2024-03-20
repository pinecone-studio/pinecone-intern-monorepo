'use client';

import { AssessmentMain } from '@/domains/assessment';
import { useRouter } from 'next/navigation';

const AssessmentPage = () => {
  const router = useRouter();

  const handleNavigateToHomePageButton = () => router.push('/');

  return (
    <>
      <div>
        hello from GLMS dashboard Assessment Page
        <AssessmentMain />
        <button onClick={handleNavigateToHomePageButton}>
          Go back to home page
        </button>
      </div>
    </>
  );
};

export default AssessmentPage;
