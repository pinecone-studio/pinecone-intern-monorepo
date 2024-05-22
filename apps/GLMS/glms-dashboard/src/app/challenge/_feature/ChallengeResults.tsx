import { Quiz } from '@/generated';
import { CheckTrueIcon, CheckFalseIcon } from '../../../assets';

export const ChallengeResults = ({ challenge }: { challenge: Quiz[] }) => {
  const studentChoices = JSON.parse(localStorage.getItem('studentChoices')!);
  const checkIsCorrect = (studentChoice: string, choice: string | undefined | null, isCorrect: boolean | undefined | null) => {
    if (studentChoice === choice && !isCorrect) {
      return 'border-red-500';
    }
    if (isCorrect) {
      return 'border-green-500';
    }
  };
  const checkIsCorrectIcon = (studentChoice: string, choice: string | undefined | null, isCorrect: boolean | undefined | null) => {
    if (studentChoice === choice && !isCorrect) {
      return <CheckFalseIcon />;
    }
    if (isCorrect) {
      return <CheckTrueIcon />;
    }
  };
  return (
    <div className="w-full text-black bg-white">
      <div className="flex flex-col items-center">
        {challenge?.map((quiz, index) => (
          <main key={quiz?._id} className="w-[700px] my-16 ">
            <div className="flex justify-center text-center">
              <p className="text-3xl font-bold mb-8">
                {index + 1}. {quiz?.question}
              </p>
            </div>
            {quiz?.choices?.map((choice) => (
              <main key={choice?._id} className={`flex justify-between  mb-8 rounded-lg border-2 border-b-4 ${checkIsCorrect(studentChoices[index].choiceId, choice?._id, choice?.isCorrect)}  `}>
                <div className="p-3 ">
                  <label>{choice?.choice}</label>
                </div>
                <div className="p-3 flex justify-center items-center">{checkIsCorrectIcon(studentChoices[index].choiceId, choice?._id, choice?.isCorrect)}</div>
              </main>
            ))}
          </main>
        ))}
      </div>
    </div>
  );
};
