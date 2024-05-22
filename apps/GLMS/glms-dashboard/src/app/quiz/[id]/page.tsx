"use client"
import { Challenge, Course, Lesson, Quiz, QuizInput, useGetChallengeByIdQuery } from '@/generated';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'

type Props = {}

const Home = (props: Props) => {
  const pathName = usePathname().substring(6);
  const [newCourse, setNewCourse] = useState<Course>();
  const [quizs, setQuizs] = useState<QuizInput[]>([]);
  const [newChallenge, setNewChallenge] = useState<Challenge[]>();
  const { data: quizData, loading: quizLoading, error: quizError } = useGetChallengeByIdQuery({ variables: { challengeId: pathName } });
  // useEffect(() => {
  //   const getByLessonIdData = quizData?.getChallengeById as Challenge[];
  //   setNewChallenge(getByLessonIdData);
  //   setQuizs(getByLessonIdData[0].quiz);
  //   console.log("-------------->",getByLessonIdData)
  // }, []);
  // setQuizs(quizData?.getChallengeById?.quiz);
  
  return (
    <div>
        <button onClick={() => console.log(quizData, quizs)} className='bg-blue-400 p-4 rounded-md'></button>
        {
            quizData?.getChallengeById?.quiz?.map((quiz, i) => {
                return (
                    <div key={i}>
                        <p>{quiz?.question}</p>
                    </div>
                )
            } )
        }
    </div>
  )
}

export default Home