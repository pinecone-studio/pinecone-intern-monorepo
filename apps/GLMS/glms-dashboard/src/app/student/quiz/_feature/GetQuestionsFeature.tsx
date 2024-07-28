"use client";

import React, { useState } from 'react';
import { useGetQuestionsQuery } from "@/generated";
import { LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GetQuestionsFeaturePropsTypes {
  quizId: string;
}

export const GetQuestionsFeature: React.FC<GetQuestionsFeaturePropsTypes> = ({ quizId }) => {
  const { data, loading, error } = useGetQuestionsQuery({
    variables: { quizId: quizId }
  });

  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string }>({});
  const [results, setResults] = useState<{ [key: string]: boolean | null }>({});

  const handleOptionChange = (questionId: string, optionId: string) => {
    setSelectedOptions(prevState => ({
      ...prevState,
      [questionId]: optionId,
    }));
  };

  const checkQuiz = () => {
    const newResults: { [key: string]: boolean } = {};
    data?.getQuestions?.forEach(question => {
      const selectedOptionId = selectedOptions[question.id];
      const correctOption = question?.options?.find(option => option?.isCorrect);
      newResults[question.id] = correctOption?.id === selectedOptionId;
    });
  
    setResults(newResults);
  };
  
  

  if (loading) {
    return <div data-testid='loading'><LoaderCircle className="h-4 w-4 animate-spin" /></div>;
  }

  if (error) {
    return <div data-testid="error">Алдаа гарлаа</div>;
  }

  if (!data?.getQuestions || data.getQuestions.length === 0) {
    return <div data-testid="no-questions" className="text-gray-500 font-semibold flex justify-center items-center">Шалгалт хоосон байна</div>;
  }

  return (
    <div className="flex flex-col gap-4 w-[500px]">
      {data.getQuestions.map((question, index) => (
          <div
            key={question?.id}
            className={`flex flex-col border bg-gray-50 p-5 rounded-[12px] shadow-sm ${results[question.id] !== undefined ? (results[question.id] ? 'border-green-500 bg-green-100' : 'border-red-500 bg-red-100') : ''}`}
            data-testid={`question-${index}`}
          >
            <h3 className="text-lg font-bold mb-1">{question?.text}</h3>
            <div>
              {question?.options?.map(option => (
                  <div key={option?.id} className="flex items-center mb-1 bg-white p-2 rounded-md border">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option?.id}
                      id={`option-${option?.id}`}
                      onChange={() => handleOptionChange(question.id, option.id)}
                      data-testid={`option-${option?.id}`}
                      className='cursor-pointer'
                    />
                    <label
                      htmlFor={`option-${option?.id}`}
                      className="ml-2 cursor-pointer"
                    >
                      {option?.optionText}
                    </label>
                  </div>
              ))}
            </div>
          </div>
      ))}

      <Button onClick={checkQuiz}>Check Quiz</Button>
    </div>
  );
};

