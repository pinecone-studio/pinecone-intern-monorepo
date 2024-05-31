'use client';
import { Quiz, useGetChallengeResultQuery } from '@/generated';
import React, { useEffect, useState } from 'react';
import Skeleton from '../../_feature/Skeleton';
import { ChallengeResults } from '../../_feature/ChallengeResults';

interface IChoice {
  quizId: string | null;
  choiceId: string | null;
}

const ResultPage = ({ params }: { params: { id: string } }) => {
  const { data, loading } = useGetChallengeResultQuery({ variables: { challengeId: params.id } });
  const [testResult, setTestResult] = useState(0);
  const studentChoices = JSON.parse(localStorage.getItem('studentChoices')!);

  const rightChoices = data?.getChallengeById?.quiz
    ?.map((quiz) =>
      quiz?.choices?.filter((choice) => {
        return choice?.isCorrect === true;
      })
    )
    .flat();

  const rightChoiceCalculator = () => {
    const result: number = studentChoices
      .map((choice: IChoice) => {
        const rightChoice = rightChoices?.find((r) => r?._id === choice.choiceId);
        if (!rightChoice) {
          return 0;
        }
        return 1;
      })
      .reduce((s: number, r: number) => r + s, 0);

    setTestResult(result);
  };

  useEffect(() => {
    rightChoiceCalculator();
  }, [data]);

  return (
    <main className=" w-full h-auto bg-white">
      <h1 className="h-40 text-black text-3xl flex items-center ml-[120px]">Quiz алдаа харах</h1>
      {loading ? (
        <section className="bg-white w-full flex flex-col items-center">
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </section>
      ) : (
        <div className="bg-white flex flex-col justify-center items-center">
          <ChallengeResults challenge={data?.getChallengeById?.quiz as Quiz[]} />
          <div className="w-[100px] h-[100px] bg-[#17191E] rounded-full flex justify-center items-center mb-20">
            <h1 className="text-white font-bold text-2xl">
              {data?.getChallengeById?.quiz?.length}/<span>{testResult}</span>
            </h1>
          </div>
        </div>
      )}
    </main>
  );
};

export default ResultPage;
