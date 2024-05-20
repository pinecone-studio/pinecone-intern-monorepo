import { FaPlus } from 'react-icons/fa6';

interface IAddAnswerButtonProps {
  label: string;
  answers: {
    choice: string;
    isCorrect: boolean;
  }[];
  handleCorrectAnswer: (_index: number) => void;
  addAnswer: () => void;
  handleAnswerChange: (_index: number, _value: string) => void;
  checked: boolean;
}

export const AddAnswer = (props: IAddAnswerButtonProps) => {
  const { label, answers, addAnswer, handleCorrectAnswer, handleAnswerChange, checked } = props;
  return (
    <div style={{ margin: 10 }}>
      <div>
        {answers.map((answer, index) => (
          <div key={index} className="flex justify-center items-center gap-5 my-1">
            {checked && (
              <input
                type="checkbox"
                id="radio-button"
                name="radio-1"
                className="radio"
                data-cy="radio-input"
                checked={answer.isCorrect}
                onChange={() => {
                  handleCorrectAnswer(index);
                }}
              />
            )}
            <input
              placeholder="Хариулт оруулна уу..."
              id={`answer-test-${index}`}
              data-cy="answer-input"
              value={answer.choice}
              className="w-full  rounded p-2 border border-[#D6D8DB]"
              onChange={(e) => {
                const value = e.target.value!;
                handleAnswerChange(index, value);
              }}
            />
          </div>
        ))}
      </div>
      <div className="my-1">
        <button
          id="add-answer"
          className={`rounded p-2 gap-3 flex text-[#8B8E95] justify-start items-center border-[#D6D8DB] w-full border ${answers.length > 3 && 'hidden'}`}
          onClick={addAnswer}
          data-testid="add-button"
        >
          <FaPlus color="black" /> {label}
        </button>
      </div>
    </div>
  );
};
