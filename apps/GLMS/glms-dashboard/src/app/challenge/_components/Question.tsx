import React from 'react';

interface IProps {
  question: string;
  index: number;
}

const Question = ({ question, index }: IProps) => {
  return (
    <div>
      <h1 className="text-4xl font-bold">
        <span>{index + 1 + '. '}</span>
        {question}
      </h1>
    </div>
  );
};

export default Question;
