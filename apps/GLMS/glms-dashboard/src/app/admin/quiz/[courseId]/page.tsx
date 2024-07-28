/* eslint-disable complexity */
"use client";

import { ActionLinkButton } from "@/components/ActionLinkButton";
import { useGetQuizQuery } from "@/generated";
import { useParams } from "next/navigation";
import { ArrowLeft } from 'lucide-react';
import { AddQuestionFeature } from "../_features/AddQuestionFeature";
import { GetQuestionsFeature } from "../_features/GetQuestionsFeature";
import { LoaderCircle } from 'lucide-react';
import { useState } from "react";


const QuizDetails = () => {
  const [shouldRefetch, setShouldRefetch] = useState<boolean>(false)
  const { courseId } = useParams();

  const { data, loading, error } = useGetQuizQuery({
    variables: { courseId: courseId }
  });

  const handleRefetch = () => {
    setShouldRefetch(true)
  }

  const quizId = data?.getQuiz?.id;

  return (
    <div className="mx-2 md:container md:mx-auto">
      <ActionLinkButton label={"Cэдэв рүү буцах"} href={`/admin/${courseId}`} Icon={ArrowLeft} />
      <div className="mt-4 bg-white rounded-[12px] p-5">
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

        {!loading && data && (
          <div>
            {quizId && <AddQuestionFeature quizId={quizId} refetchQuestions={handleRefetch}/>}
          </div>
        )}
      </div>
      
      <div className="mt-4 bg-white rounded-[12px] p-5">
        {quizId && <GetQuestionsFeature quizId={quizId} shouldRefetch={shouldRefetch} setShouldRefetch={setShouldRefetch}/>}
      </div>
    </div>
  );
}

export default QuizDetails;
