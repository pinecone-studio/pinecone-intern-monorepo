'use client';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Button } from './_components';
import { useRouter } from 'next/navigation';
import { AddQuiz } from './_feature/AddQuiz';
import { useSearchParams } from 'next/navigation';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { UpdateQuiz } from './_feature/UpdateQuiz';
import { useCreateChallengeMutation, QuizInput } from '@/generated';
import { ApolloError } from '@apollo/client';
type answerType = { choice: string; isCorrect: boolean }[];

const Page = () => {
  const [createChallenge] = useCreateChallengeMutation();
  const [quizs, setQuizs] = useState<QuizInput[]>([]);

  const router = useRouter();
  const searchParams = useSearchParams();
  const refCourse = searchParams.get('key');

  const handleAllQuiz = (newQuiz: QuizInput) => {
    const newAnswers = [...quizs];
    newAnswers.push(newQuiz);
    setQuizs(newAnswers);
  };

  const updateQuiz = (index: number, newQuiz: QuizInput) => {
    const newAnswers = [...quizs];
    newAnswers[index] = newQuiz;
    setQuizs(newAnswers);
  };

  const deleteQuiz = (index: number) => {
    const allQuiz = [...quizs];
    allQuiz.splice(index, 1);
    setQuizs(allQuiz);
  };

  const handleBack = () => {
    router.push('/dashboard');
  };

  const handleCreateChallenge = async () => {
    try {
      const xp = quizs?.length;
      const author = 'teacher';
      await createChallenge({
        variables: {
          quizInput: quizs,
          challengeInput: { author, refCourse, xp },
        },
      });
      toast.success('Сорилийг амжилттай үүсгэлээ');
      router.push('/dashboard');
    } catch (error) {
      if (error instanceof ApolloError) {
        toast.error(error?.graphQLErrors[0]?.message, {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: true,
        });
      }
    }
  };

  return (
    <div className="container mx-auto">
      <div data-testid="challenge-dashboard-page" className="min-h-screen h-full w-full pb-20">
        <button className="flex gap-1 p-2 text-base justify-center items-center font-semibold" data-cy="dashboard-router" onClick={handleBack}>
          <FaArrowLeftLong /> Нүүр хуудас
        </button>
        {quizs.map((quiz: QuizInput, i: number) => {
          return (
            <div key={i}>
              <UpdateQuiz deleteQuiz={deleteQuiz} updateQuiz={updateQuiz} question={quiz.question!} choicesType={quiz.choicesType!} choices={quiz.choices as answerType} index={i} />
            </div>
          );
        })}
        <div>
          <AddQuiz handleAllQuiz={handleAllQuiz} />
        </div>
        <div className="border-t-2 flex justify-end fixed bottom-2 left-0 right-0 py-3 px-12 w-full border-[#ECEDF0]">
          <Button data-cy="submit-challenge" label="Нийтлэх" w={36} h={12} btnColor="white" onClick={handleCreateChallenge} />
        </div>
      </div>
    </div>
  );
};

export default Page;
