/* eslint-disable complexity */
"use client";

import { ActionLinkButton } from "@/components/ActionLinkButton";
import { useGetQuizQuery } from "@/generated";
import { useParams } from "next/navigation";
import { ArrowLeft } from 'lucide-react';
import { LoaderCircle } from 'lucide-react';
import { GetQuestionsFeature } from "../_feature/GetQuestionsFeature";


const QuizDetails = () => {
  const { courseId } = useParams();

  const { data, loading, error } = useGetQuizQuery({
    variables: { courseId: courseId }
  });

  const quizId = data?.getQuiz?.id;

  return (
    <div className="mx-2 md:container md:mx-auto">
      <ActionLinkButton label={"Cэдэв рүү буцах"} href={`/student/${courseId}`} Icon={ArrowLeft} />      
      <div className="mt-4 bg-white rounded-[12px] p-5 flex justify-center">
        {error && (
          <div data-testid="error-message">
            {error.message}
          </div>
        )}

        {loading && (
          <div data-testid="loading">
            <LoaderCircle className="h-4 w-4 animate-spin"/> 
          </div>
        )}

        {quizId && <GetQuestionsFeature quizId={quizId}/>}
      </div>
    </div>
  );
}

export default QuizDetails;