"use client"
import { Challenge, Course, Lesson, Quiz, useGetChallengeByIdQuery } from '@/generated';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'

type Props = {}

const Home = (props: Props) => {
    const pathName = usePathname().substring(1);
  const [newCourse, setNewCourse] = useState<Course>();
  const [newChallenge, setNewChallenge] = useState<Challenge[]>();
  const { data: quizData, loading: quizLoading, error: quizError } = useGetChallengeByIdQuery({ variables: { challengeId: "6639b508ad9ecc26d93ecafd" } });
  useEffect(() => {
    const getByLessonIdData = quizData?.getChallengeById as Challenge[];
    setNewChallenge(getByLessonIdData);
  }, [quizData, quizLoading, quizError]);

  
  return (
    <div>
        <button onClick={() => console.log(quizData)} className='bg-blue-400 p-4 rounded-md'></button>
        {
            quizData?.getChallengeById?.quiz?.map((quiz) => {
                return (
                    <>
                        <p>{quiz?.question}</p>
                    </>
                )
            } )
        }
    </div>
  )
}

export default Home