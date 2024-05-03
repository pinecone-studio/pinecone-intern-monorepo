'use client';

import { useGetChallengesByStatusQuery } from '@/generated';

const ChallengePage = () => {
  const { data, loading } = useGetChallengesByStatusQuery();
  return (
    <div>
      <h1>Welcome to Challenge page</h1>
      <h1>{!loading && data?.getChallengesByStatus?.map((challenge) => challenge?.title)}</h1>
    </div>
  );
};

export default ChallengePage;
