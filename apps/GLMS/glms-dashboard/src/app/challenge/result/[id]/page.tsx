'use client';
import { Quiz, useGetChallengeResultQuery } from '@/generated';
import React from 'react';
import Skeleton from '../../_feature/Skeleton';
import { ChallengeResults } from '../../_feature/ChallengeResults';

const ResultPage = ({ params }: { params: { id: string } }) => {
  const { data, loading } = useGetChallengeResultQuery({ variables: { challengeId: params.id } });
  return (
    <main className="bg-white w-full h-auto">
      <h1 className="h-40 text-black text-3xl flex items-center ml-[120px]">Quiz алдаа харах</h1>
      {loading ? (
        <section className="bg-white w-full flex flex-col items-center">
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </section>
      ) : (
        <ChallengeResults challenge={data?.getChallengeById?.quiz as Quiz[]} />
      )}
    </main>
  );
};

export default ResultPage;
