'use client';
import { useGetChallengesByStatusQuery } from '@/generated';
import { CheckTrueIcon, CheckFalseIcon } from '../../../assets';

export const ChallengeResults = () => {
  const { data, loading } = useGetChallengesByStatusQuery();

  return (
    <div className="w-full">
      <h1 className="h-40 text-3xl flex items-center ml-[120px]">Quiz алдаа харах</h1>
      <div className="flex flex-col items-center">
        {!loading &&
          data?.getChallengesByStatus?.map((challenge) => {
            return (
              <main key={challenge?._id} data-cy="Challenge-Result-Title">
                <div className="flex gap-2">
                  <p>Challenge title:</p>
                  <p>{challenge?.title}</p>
                </div>
                {challenge?.quiz?.map((quiz, index) => (
                  <main key={quiz?._id} className="w-[700px] my-16 ">
                    <div className="flex justify-center text-center">
                      <p className="text-3xl font-bold mb-8">
                        {index + 1}. {quiz?.question}
                      </p>
                    </div>
                    {quiz?.choices?.map((choice, choiceIndex) => (
                      <main key={choice?._id} className={`flex justify-between  mb-8 rounded-lg border-2 border-b-4 ${choice?.isCorrect ? 'border-green-500 ' : 'border-red-500 '}`}>
                        <div className="p-3 ">
                          <label htmlFor={`choice-${index}-${choiceIndex}`}>{choice?.choice}</label>
                        </div>
                        <div className="p-3 flex justify-center items-center">{choice?.isCorrect ? <CheckTrueIcon /> : <CheckFalseIcon />}</div>
                      </main>
                    ))}
                  </main>
                ))}
              </main>
            );
          })}
      </div>
    </div>
  );
};
