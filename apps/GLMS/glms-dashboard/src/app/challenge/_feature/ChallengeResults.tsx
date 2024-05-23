import { Quiz } from '@/generated';
import { CheckTrueIcon, CheckFalseIcon } from '../../../assets';
import ChoiceImage from '../_components/ImageChoicePicker';

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
    <div data-testid="challenge-result" className="w-full text-black bg-white">
      <div className="flex flex-col items-center">
        {challenge?.map((quiz, index) => (
          <main key={quiz?._id} className="w-full flex flex-col items-center my-16 ">
            <div className="flex justify-center text-center">
              <p className="text-3xl font-bold mb-8">
                {index + 1}. {quiz?.question}
              </p>
            </div>
            <div className={`flex ${quiz?.choicesType === 'TEXT' ? 'flex-col' : 'flex-row'} w-full justify-center items-center`}>
              {quiz?.choices?.map((choice) =>
                quiz.choicesType === 'TEXT' ? (
                  <main
                    key={choice?._id}
                    className={`flex w-[700px] justify-between  mb-8 rounded-lg border-2 border-b-4 ${checkIsCorrect(studentChoices[index].choiceId, choice?._id, choice?.isCorrect)}  `}
                  >
                    <div className="p-3 ">
                      <label>{choice?.choice}</label>
                    </div>
                    <div className="p-3 flex justify-center items-center">{checkIsCorrectIcon(studentChoices[index].choiceId, choice?._id, choice?.isCorrect)}</div>
                  </main>
                ) : (
                  <main className="flex w-[588px] h-[483px]">
                    <img
                      src={choice?.choice!}
                      width={588}
                      height={483}
                      alt="ChoiceImage"
                      className={`object-cover rounded-[8px] border-4 ${checkIsCorrect(studentChoices[index].choiceId, choice?._id, choice?.isCorrect)} `}
                    />
                  </main>
                )
              )}
            </div>
          </main>
        ))}
      </div>
    </div>
  );
};
