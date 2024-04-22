'use client';

import Link from 'next/link';
import { useHelloQueryFromRecruitingServiceQuery } from '../../generated';
import { JobRecruitDashboard } from './_components/feedJob';

const RecruitPage = () => {
  const { data } = useHelloQueryFromRecruitingServiceQuery();

  return (
    <div>
      <h1>hello from Recruiting Service Query {data?.helloQueryFromRecruitingService}</h1>
      <JobRecruitDashboard />
      <Link href="/">
        <button>Go back to home page</button>
      </Link>
    </div>
  );
};

export default RecruitPage;
