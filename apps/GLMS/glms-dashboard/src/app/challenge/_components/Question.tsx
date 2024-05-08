import React from 'react';

interface QuestionProps {
  question: string | null | undefined;
  index: number;
}

const Question = ({ question, index }: QuestionProps) => {
  return (
    <div>
      <h1 className="text-4xl font-bold text-black text-center">
        <span>{index + 1 + '. '}</span>
        {question}
      </h1>
    </div>
  );
};

export default Question;
