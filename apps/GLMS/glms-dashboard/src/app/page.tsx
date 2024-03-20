'use client';

import { useRouter } from 'next/navigation';

export default async function Index() {
  const router = useRouter();

  const handleProfilePageButton = () => {
    router.push('/profile');
  };

  const handleAssessmentPageButton = () => {
    router.push('/assessment');
  };

  return (
    <>
      <div>
        hello from GLMS dashboard
        <button onClick={handleProfilePageButton}>Go to profile page</button>
        <button onClick={handleAssessmentPageButton}>
          Go to assessment page
        </button>
      </div>
    </>
  );
}
