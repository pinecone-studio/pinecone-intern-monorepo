'use client';

import { useGetChallengesByStatusQuery } from '@/generated/index';
import { TestScore } from './_components/TestScore';

const ChallengePage = () => {
  const { data, loading } = useGetChallengesByStatusQuery();
  return (
    <div>
      <TestScore />
      <h1>{!loading && data?.getChallengesByStatus?.map((challenge) => challenge?.title)}</h1>
    </div>
  );
};

export default ChallengePage;
