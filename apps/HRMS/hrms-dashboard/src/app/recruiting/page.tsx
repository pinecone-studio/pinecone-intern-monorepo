'use client';

import Link from 'next/link';
import { useHelloQueryFromRecruitingServiceQuery } from '../../generated';
import { RecruitMain } from './_features';

const RecruitPage = () => {
  const { data } = useHelloQueryFromRecruitingServiceQuery();

  return (
    <div>
      <h1>hello from HRMS dashboard Recruiting Page</h1>
      <h1>hello from Recruiting Service Query {data?.helloQueryFromRecruitingService}</h1>
      <RecruitMain />
      <Link href="/">
        <button>Go back to home page</button>
      </Link>
    </div>
  );
};

export default RecruitPage;
