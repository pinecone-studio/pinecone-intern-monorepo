'use client';

import Question from '../_components/Question';
import ChoiceText from '../_components/TextChoicePicker';
import { useEffect, useState } from 'react';
import ProgressBar from '../_components/ProgressBar';
import Skeleton from '../_feature/Skeleton';
import { useGetChallengeQuery } from '@/generated';
import { useRouter } from 'next/navigation';
import ChoiceImage from '../_components/ImageChoicePicker';

interface IStudentChoiceData {
  quizId: string;
  choiceId: string;
}

const QuizPage = ({ params }: { params: { id: string } }) => {
  const { data, loading } = useGetChallengeQuery({ variables: { courseId: params.id } });
  const [selectedChoice, setSelectedChoice] = useState<string | undefined | null>(null);
  const [selectedQuiz, setSelectedQuiz] = useState<string | undefined | null>(null);
  let oneProgressValue = 0;
  const [progressValue, setProgressValue] = useState<number>(0);
  const [isShow, setIsShow] = useState<number>(0);
  const [isLast, setIsLast] = useState(false);
  const router = useRouter();
  const [studentChoiceData, setStudentChoiceData] = useState<IStudentChoiceData[]>([]);

  const handleChange = (id: string | undefined | null, quizId: string | undefined | null) => {
    setSelectedChoice(id);
    setSelectedQuiz(quizId);
  };

  const studentChoiceDataPusher = () => {
    studentChoiceData.push({ quizId: selectedQuiz!, choiceId: selectedChoice! });
    localStorage.setItem('studentChoices', JSON.stringify(studentChoiceData));
  };

  const oneValueCalculator = () => {
    if (data?.getChallengeById?.quiz) {
      oneProgressValue = 100 / data?.getChallengeById?.quiz?.length;
    }
  };

  const handleProgressValue = () => {
    if (!isLast) {
      setIsShow(isShow + 1);
    }
    if (progressValue !== 100) {
      setSelectedChoice(null);
      setProgressValue((prev) => prev + oneProgressValue!);
      checkLast();
    }
  };
  const checkStudentChoices = () => {
    if (localStorage.getItem('studentChoices')) {
      const studentChoices = JSON.parse(localStorage.getItem('studentChoices')!);
      setIsShow(studentChoices.length);
      setStudentChoiceData(studentChoices);
      setProgressValue(oneProgressValue * studentChoices.length);
    }
  };
  useEffect(() => {
    oneValueCalculator();
    checkStudentChoices();
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
                  <div className={`flex ${quiz?.choicesType === 'TEXT' ? 'flex-col' : 'flex-row'} items-center gap-8 mt-16`}>
                    {quiz?.choices?.map((choice) =>
                      quiz.choicesType === 'TEXT' ? (
                        <ChoiceText key={choice?._id} choice={choice?.choice} quizId={quiz?._id} id={choice?._id} selectedChoice={selectedChoice} handleChange={handleChange} />
                      ) : (
                        <ChoiceImage key={choice?._id} choice={choice?.choice} setSelectedChoice={setSelectedChoice} selectedChoice={selectedChoice} id={choice?._id} />
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })
      )}
      <div>
        {isLast ? (
          <button
            disabled={selectedChoice ? false : true}
            role="button"
            className="btn border-0 rounded-lg text-white p-2 
      text-sm bg-[#989898] w-28"
            onClick={() => {
              handleProgressValue();
              studentChoiceDataPusher();
              router.push(`challenge/result/${params.id}`);
            }}
          >
            Дуусгах
          </button>
        ) : (
          <button
            data-testid="next-button"
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
