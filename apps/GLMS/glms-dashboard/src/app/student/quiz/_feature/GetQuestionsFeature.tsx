"use client";

import React, { useState, useCallback } from 'react';
import { useGetQuestionsQuery } from "@/generated";
import { LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GetQuestionsFeaturePropsTypes {
  quizId: string;
}

export const GetQuestionsFeature: React.FC<GetQuestionsFeaturePropsTypes> = ({ quizId }) => {
  const { data, loading, error } = useGetQuestionsQuery({
    variables: { quizId }
  });

  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [results, setResults] = useState<Record<string, boolean | null>>({});

  const handleOptionChange = useCallback((questionId: string, optionId: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [questionId]: optionId,
    }));
  }, []);

  const checkQuiz = useCallback(() => {
    if (!data?.getQuestions) return;
  
    const newResults: Record<string, boolean | null> = {};
    data.getQuestions.forEach(question => {
      if (!question || !question.options) return; 
  
      const selectedOptionId = selectedOptions[question.id];
      const correctOption = question.options?.find(option => option?.isCorrect);
      newResults[question.id] = correctOption ? correctOption.id === selectedOptionId : null;
    });
  
    setResults(newResults);
  }, [data, selectedOptions]);
  

  if (loading) {
    return <div data-testid="loading"><LoaderCircle className="h-4 w-4 animate-spin" /></div>;
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
        question && (
          <div
            key={question.id}
            className={`flex flex-col border bg-gray-50 p-5 rounded-lg shadow-sm ${results[question.id] !== undefined ? (results[question.id] ? 'border-green-500 bg-green-100' : 'border-red-500 bg-red-100') : ''}`}
            data-testid={`question-${index}`}
          >
            <h3 className="text-lg font-bold mb-1">{question.text}</h3>
            <div>
              {question.options?.map(option => (
                option && (
                  <label key={option.id} htmlFor={`option-${option.id}`} className="flex items-center mb-1 bg-white p-2 rounded-md border cursor-pointer">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option.id}
                      id={`option-${option.id}`}
                      onChange={() => handleOptionChange(question.id, option.id)}
                      data-testid={`option-${option.id}`}
                      className="mr-2"
                    />
                    {option.optionText}
                  </label>
                )
              ))}
            </div>
          </div>
        )
      ))}
      <Button onClick={checkQuiz}>Check Quiz</Button>
    </div>
  );
};
