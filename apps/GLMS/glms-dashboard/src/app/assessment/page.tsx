'use client';

import { useRouter } from 'next/navigation';
import { AssessmentMain } from './_features';
import { useHelloQueryFromAssessmentServiceQuery } from '@/generated/index';

const AssessmentPage = () => {
  const { data, loading, error } = useHelloQueryFromAssessmentServiceQuery();
  const router = useRouter();

  const handleNavigateToHomePageButton = () => router.push('/');

  if (loading) {
    return <div>This is Loading</div>;
  }

  if (error) {
    return <div>This is Error</div>;
  }

  return (
    <div>
      <h1>hello from GLMS dashboard Assessment Page {}</h1>
      <h1>
        hello from Assessment Service Query
        {data?.helloQueryFromAssessmentService}
      </h1>
      <AssessmentMain />
      <button onClick={handleNavigateToHomePageButton}>
        Go back to home page
      </button>
    </div>
  );
};

export default AssessmentPage;
