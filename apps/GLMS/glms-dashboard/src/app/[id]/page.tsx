'use client';
import { Course, Lesson, useGetCourseByIdQuery, useGetLessonByIdQuery } from '@/generated';
import CourseRender from './_feature/CourseRender';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
const Home = () => {
  const pathName = usePathname().substring(1);
  const [newCourse, setNewCourse] = useState<Course>();
  const [newLesson, setNewLesson] = useState<Lesson[]>();

  const { data: lessonData, loading: lessonLoading, error: lessonError } = useGetLessonByIdQuery({ variables: { getLessonByIdId: pathName } });
  useEffect(() => {
    const getByLessonIdData = lessonData?.getLessonById as Lesson[];
    setNewLesson(getByLessonIdData);
  }, [lessonData, lessonLoading, lessonError]);

  const { data, loading, error } = useGetCourseByIdQuery({ variables: { getCourseByIdId: pathName } });
  useEffect(() => {
    const getByIdData = data?.getCourseById;
    setNewCourse(getByIdData);
  }, [data, loading, error]);

  if (loading || lessonLoading)
    return (
      <div className="flex justify-center items-center h-[92vh] w-screen">
        <div className="text-center">
          <p className="loading loading-spinner m-auto loading-lg" />
          <p className="text-xl ">Loading...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className=" w-full h-full flex justify-center items-center">
        <p>Error: {error.message}</p>
      </div>
    );

  return (
    <div data-cy="idCourse" className="bg-[#F7F7F8]">
      <CourseRender data-cy-id="courseId" data={newCourse} lessonData={newLesson} />
    </div>
  );
};
export default Home;
