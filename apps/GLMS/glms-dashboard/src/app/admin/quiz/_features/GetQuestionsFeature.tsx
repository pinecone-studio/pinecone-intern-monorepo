/* eslint-disable no-unused-vars */
import { useGetQuestionsQuery } from "@/generated";
import { LoaderCircle } from 'lucide-react';
import { useEffect } from "react";

interface GetQuestionsFeaturePropsTypes {
  quizId: string;
  shouldRefetch: boolean;
  setShouldRefetch: (value: boolean) => void;
}

export const GetQuestionsFeature: React.FC<GetQuestionsFeaturePropsTypes> = ({ quizId, shouldRefetch, setShouldRefetch }) => {
  const { data, loading, error, refetch } = useGetQuestionsQuery({
    variables: { quizId: quizId }
  });

  useEffect(() => {
    if (shouldRefetch) {
      refetch()
      setShouldRefetch(false);
    }
  }, [shouldRefetch, refetch, setShouldRefetch]);

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
    <div className="flex flex-col gap-2 md:grid md:grid-cols-2">
      {data.getQuestions.map((question, index) => (
        <div
          key={question?.id}
          className="flex flex-col border bg-gray-50 p-5 rounded-[12px] shadow-sm"
          data-testid={`question-${index}`}
        >
          <h3 className="text-lg font-bold mb-1">{question?.text}</h3>
          <div>
            {question?.options?.map(option => (
              <div key={option?.id} className="flex justify-between mb-1">
                <div data-testid={`option-text-${index}`}>{option?.optionText}</div>
                <div data-testid={`option-correctness-${index}`} className={`w-[120px] text-sm flex items-center justify-center px-2 rounded-md font-semibold ${option?.isCorrect ? 'text-green-600 bg-green-200' : 'text-red-500 bg-red-200'}`}>
                  {option?.isCorrect ? 'Correct' : 'Not Correct'}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
