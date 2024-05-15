'use client';
import { Course, Lesson, useGetCourseByIdQuery, useGetLessonByIdQuery } from '@/generated';
import CourseRender from './_feature/CourseRender';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Loading from '../../components/Loading';
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

  if (loading || lessonLoading) return <Loading />;

  return (
    <div data-cy="idCourse" className="bg-[#F7F7F8]">
      <CourseRender data-cy-id="courseId" data={newCourse} lessonData={newLesson} />
    </div>
  );
};
export default Home;
