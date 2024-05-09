'use client';

import { useState } from 'react';
interface IAddAnswerButtonProps {
  label: string;
  answers: {
    answer: string;
    isCorrect: boolean;
  }[];
  handleCorrectAnswer: (_index: number) => void;
  addAnswer: () => void;
  handleAnswerChange: (_index: number, _value: string) => void;
}

export const AddAnswer = (props: IAddAnswerButtonProps) => {
  const { label, answers, addAnswer, handleCorrectAnswer, handleAnswerChange } = props;
  const [checked, setChecked] = useState(false);

  return (
    <div style={{ margin: 10 }}>
      <div>
        {answers.map((answer, index) => (
          <div key={index} className="flex gap-5 m-2">
            {checked && (
              <input
                type="radio"
                id="radio-button"
                name="radio-1"
                className="radio"
                data-cy="radio-input"
                onClick={() => {
                  handleCorrectAnswer(index);
                }}
              />
            )}
            <input
              placeholder="Хариулт оруулна уу..."
              id={`answer-test-${index}`}
              data-cy="answer-input"
              value={answer.answer}
              className="w-full border border-black rounded p-1"
              onChange={(e) => {
                const value = e.target.value!;
                handleAnswerChange(index, value);
              }}
            />
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-4">
        <button id="add-answer" className=" rounded p-1 w-full border border-black " disabled={answers.length > 3} onClick={addAnswer} data-testid="add-button">
          + {label}
        </button>
        <button id="choose-button" className=" rounded p-1 w-full border border-black" onClick={() => setChecked(!checked)}>
          Зөв хариулт сонгох
        </button>
      </div>
    </div>
  );
};
