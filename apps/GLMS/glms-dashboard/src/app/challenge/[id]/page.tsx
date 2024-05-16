'use client';

import { useGetChallengeByIdQuery } from '@/generated';
import Question from '../_components/Question';
import ChoiceText from '../_components/TextChoicePicker';
import { useEffect, useState } from 'react';
import ProgressBar from '../_components/ProgressBar';
import Link from 'next/link';
import Skeleton from '../_feature/Skeleton';

interface IStudentChoiceData {
  quizId: string;
  choiceId: string;
}

const QuizPage = ({ params }: { params: { id: string } }) => {
  const { data, loading } = useGetChallengeByIdQuery({ variables: { challengeId: params.id } });
  const [selectedChoice, setSelectedChoice] = useState<string | undefined | null>(null);
  const [selectedQuiz, setSelectedQuiz] = useState<string | undefined | null>(null);
  const [oneProgressValue, setOneProgressValue] = useState<number | undefined>(0);
  const [progressValue, setProgressValue] = useState<number>(0);
  const [isShow, setIsShow] = useState(0);
  const [isLast, setIsLast] = useState(false);

  const [studentChoiceData] = useState<IStudentChoiceData[]>([]);

  const handleChange = (id: string | undefined | null, quizId: string | undefined | null) => {
    setSelectedChoice(id);
    setSelectedQuiz(quizId);
  };

  const studentChoiceDataPusher = () => {
    const newStudentChoiceData = studentChoiceData.push({ quizId: selectedQuiz!, choiceId: selectedChoice! });
    localStorage.setItem('studentChoices', JSON.stringify(newStudentChoiceData));
    console.log('studentChoices', studentChoiceData);
  };

  const oneValueCalculator = () => {
    if (data?.getChallengeById?.quiz) {
      setOneProgressValue(100 / data?.getChallengeById?.quiz?.length);
    }
  };

  const handleProgressValue = () => {
    if (progressValue !== 100) {
      setSelectedChoice(null);
      setIsShow(isShow + 1);
      setProgressValue((prev) => prev + oneProgressValue!);
      checkLast();
    }
  };
  useEffect(() => {
    oneValueCalculator();
  }, [loading]);

  const checkLast = () => {
    if (data?.getChallengeById?.quiz && data?.getChallengeById?.quiz?.length - 2 === isShow) {
      setIsLast(true);
    } else {
      setIsLast(false);
    }
  };
  return (
    <div className="bg-white flex flex-col justify-center items-center h-[90vh]">
      <ProgressBar progressValue={progressValue} />
      {loading ? (
        <Skeleton />
      ) : (
        data?.getChallengeById?.quiz?.map((quiz, index) => {
          return (
            <div key={quiz?._id}>
              {isShow === index && (
                <div key={quiz?._id} className="flex w-full flex-col justify-center items-center h-[80vh] gap-[92px]">
                  <Question question={quiz?.question} index={index} />
                  <div className="flex flex-col items-center gap-8 mt-16">
                    {quiz?.choices?.map((choice) => (
                      <ChoiceText key={choice?._id} choice={choice?.choice} quizId={quiz?._id} id={choice?._id} selectedChoice={selectedChoice} handleChange={handleChange} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })
      )}
      <div>
        {isLast ? (
          <Link href="/challenge">
            <button
              disabled={selectedChoice ? false : true}
              role="button"
              className="btn border-0 rounded-lg text-white p-2 
      text-sm bg-[#989898] w-28"
              onClick={() => {
                handleProgressValue();
                studentChoiceDataPusher();
              }}
            >
              Дуусгах
            </button>
          </Link>
        ) : (
          <button
            disabled={selectedChoice ? false : true}
            role="button"
            className="btn border-0 rounded-lg text-white p-2 
      text-sm bg-[#989898] w-28"
            onClick={() => {
              handleProgressValue();
              studentChoiceDataPusher();
            }}
          >
            Дараах
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
