'use client';

import { useGetChallengesByStatusQuery } from '@/generated';
import { ChallengeResults } from './_feature/ChallengeResults';

const ChallengePage = () => {
  const { data, loading } = useGetChallengesByStatusQuery();
  return (
    <div className="w-screen overflow-hidden px-[120px] bg-white">
      <h1>Welcome to Challenge page</h1>
      <h1>{!loading && data?.getChallengesByStatus?.map((challenge) => challenge?.title)}</h1>
      <ChallengeResults />
    </div>
  );
};

export default ChallengePage;
