"use client"

import { QuizCard } from "@/components/QuizCard"
import { useGetQuizQuery } from "@/generated"
import { useParams } from "next/navigation"

export const Quiz = () => {
    const {courseId} = useParams();

    const {data, loading, error, refetch} = useGetQuizQuery({
        variables: {courseId: courseId},
    });

    refetch();

    if(error){
      return <div data-testid="error-message">Error: {error.message}</div>
    }

    if (loading || !data) {
      return <div  data-testid="loading">Quiz loading...</div>
    }

    console.log('Quiz data:', data);

    return (
    <div>
      <QuizCard href={`/student/quiz/${data?.getQuiz?.courseId}`} title={`${data?.getQuiz?.courseId}`} />
    </div>
  ); 
};