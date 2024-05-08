'use client';

import { useGetChallengeByIdQuery } from '@/generated';
import Question from '../_components/Question';
import ChoiceText from '../_components/TextChoicePicker';
import { useState } from 'react';
import ProgressBar from '../_components/ProgressBar';

const QuizPage = ({ params }: { params: { id: string } }) => {
  const [selectedChoice, setSelectedChoice] = useState<string | undefined | null>(null);
  const handleChange = (id: string | undefined | null) => {
    setSelectedChoice(id);
  };
  const { data } = useGetChallengeByIdQuery({ variables: { challengeId: params.id } });
  return (
    <div className="bg-[#f7f7f8] w-screen overflow-hidden flex flex-col items-center pt-10">
      <ProgressBar />
      {data?.getChallengeById?.quiz?.map((quiz, index) => {
        return (
          <>
            <div key={quiz?._id} className="w-1/2">
              <Question question={quiz?.question} index={index} />
              <div className="flex flex-col items-center gap-8 mt-16">
                {quiz?.choices?.map((choice) => (
                  <ChoiceText key={choice?._id} choice={choice?.choice} id={choice?._id} selectedChoice={selectedChoice} handleChange={handleChange} />
                ))}
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default QuizPage;
