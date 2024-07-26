"use client"

import { ActionLinkButton } from "@/components/ActionLinkButton"
import { useGetQuizQuery } from "@/generated"
import { useParams } from "next/navigation"
import { ArrowLeft } from 'lucide-react';
import { AddQuestionFeature } from "../_features/AddQuestionFeature";


const QuizDetails = () => {
  const {courseId} = useParams()

  const {data, loading, error, refetch} = useGetQuizQuery({
        variables: {courseId: courseId}
  })

  refetch()

  if(error){
    return <div data-testid="error-message">Error: {error.message}</div>
  }
  
  if (loading || !data) {
    return <div  data-testid="loading">Quiz loading...</div>
  }

  const quizId = data?.getQuiz?.id;
    
  return (
    <div className="mx-auto container">
      <ActionLinkButton label={"Cэдэв рүү буцах"} href={`/admin/${courseId}`} Icon={ArrowLeft}/>
      <div className="mt-4 bg-white rounded-[12px] p-5">
       <h1>Quiz</h1>
         <div>Quiz Id: {data?.getQuiz?.id}</div>
         <div>Course id: {data?.getQuiz?.courseId}</div>
         <div className="mt-2 flex gap-2">
         {quizId && <AddQuestionFeature quizId={quizId} />}
        </div>
      </div>
    </div>
  )
}

export default QuizDetails