"use client";
import { useState } from "react";
 
interface IAddAnswerButtonProps {
  label: string;
  isDisabled: boolean;
  answers: {
    answer: string;
    isCorrect: boolean;
  }[];
  handleCorrectAnswer: (_: number) => void;
  addAnswer: () => void;
  handleAnswerChange: (_index: number, _value: string) => void;
}
 
export const AddAnswerButton = (props: IAddAnswerButtonProps) => {
  const {
    label,
    isDisabled,
    answers,
    addAnswer,
    handleCorrectAnswer,
    handleAnswerChange,
  } = props;
  const [checked, setChecked] = useState(true);
 
 
  return (
    <div style={{ margin: 10 }}>
      <div>
        {answers.map((answer, index) => (
          <div key={index} className="flex gap-5 m-2">
            {checked ? (
              <input type="radio" id="radio-button-glms" name="radio-1" className="radio"  onClick={() => {
                handleCorrectAnswer(index);
              }} />
            ) : (
              <></>
            )}
            <input
            id={`answer-test-${index}`}
              placeholder="Хариулт оруулна уу..."
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
        <button id="add-answer" className=" rounded p-1 w-full border border-black" disabled={isDisabled} onClick={addAnswer}>
          + {label}
        </button>
        <button id="choose-button" className=" rounded p-1 w-full border border-black" onClick={() => setChecked(!checked)}>
          Зөв хариулт сонгох
        </button>
      </div>
    </div>
  );
};