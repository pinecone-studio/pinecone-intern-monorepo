'use client';

import { useGetChallengeByIdQuery } from '@/generated';
import Question from '../_components/Question';
import ChoiceText from '../_components/TextChoicePicker';
import { useEffect, useState } from 'react';
import ProgressBar from '../_components/ProgressBar';

const QuizPage = ({ params }: { params: { id: string } }) => {
  const [selectedChoice, setSelectedChoice] = useState<string | undefined | null>(null);
  const handleChange = (id: string | undefined | null) => {
    setSelectedChoice(id);
  };
  const [isShow, setIsShow] = useState(0);
  const { data, loading } = useGetChallengeByIdQuery({ variables: { challengeId: params.id } });

  //progressBar
  // 6639b508ad9ecc26d93ecafd

  const oneValueCalculator = () => {
    if (data?.getChallengeById?.quiz) {
      setOneProgressValue(100 / data?.getChallengeById?.quiz?.length);
    }
  };
  const [oneProgressValue, setOneProgressValue] = useState<number | undefined>(0);
  const [progressValue, setProgressValue] = useState<number>(0);

  const handleProgressValue = () => {
    if (progressValue !== 100) {
      setProgressValue((prev) => prev + oneProgressValue!);
    }
  };
  useEffect(() => {
    oneValueCalculator();
  }, [loading]);

  return (
    <div className="bg-[#f7f7f8] flex flex-col justify-center items-center">
      <ProgressBar progressValue={progressValue} />
      {data?.getChallengeById?.quiz?.map((quiz, index) => {
        return (
          <div key={quiz?._id}>
            {isShow === index ? (
              <div key={quiz?._id} className="flex w-full flex-col justify-center items-center h-[80vh] gap-[92px]">
                <Question question={quiz?.question} index={index} />
                <div className="flex flex-col items-center gap-8 mt-16">
                  {quiz?.choices?.map((choice) => (
                    <ChoiceText key={choice?._id} choice={choice?.choice} id={choice?._id} selectedChoice={selectedChoice} handleChange={handleChange} />
                  ))}
                </div>
              </div>
            ) : (
              ''
            )}
          </div>
        );
      })}
      <button role="button" className="btn rounded-lg text-white p-2 text-sm w-1/2 bg-[#989898]" onClick={() => (setIsShow(isShow + 1), handleProgressValue())}>
        NEXT
      </button>
    </div>
  );
};

export default QuizPage;
