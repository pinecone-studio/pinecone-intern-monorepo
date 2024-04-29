'use client';

import { useRouter } from 'next/navigation';
import { AssessmentMain } from './_features';
import { useHelloQueryFromAssessmentServiceQuery } from '@/generated/index';

const AssessmentPage = () => {
  const { data } = useHelloQueryFromAssessmentServiceQuery();
  const router = useRouter();

  const handleNavigateToHomePageButton = () => router.push('/');

  return (
    <div data-testid="assessment-main">
      <h1>hello from GLMS dashboard Assessment Page</h1>
      <h1>
        hello from Assessment Service Query
        {data?.helloQueryFromAssessmentService}
      </h1>
      <AssessmentMain />
      <button onClick={handleNavigateToHomePageButton}>Go back to home page</button>
    </div>
  );
};

export default AssessmentPage;
