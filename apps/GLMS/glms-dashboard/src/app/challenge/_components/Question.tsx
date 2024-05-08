import React from 'react';

interface QuestionProps {
  question: string;
  index: number;
}

const Question = ({ question, index }: QuestionProps) => {
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
