'use client';
import { Course, Lesson, useGetCourseByIdQuery, useGetLessonByIdQuery } from '@/generated';
import CourseRender from './_feature/CourseRender';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Loading from '../../components/Loading';
const Home = () => {
  const pathname = usePathname().substring(1);
  const [newCourse, setNewCourse] = useState<Course>();
  const [newLesson, setNewLesson] = useState<Lesson[]>();
  const { data: lessonData, loading: lessonLoading, error: lessonError, refetch: lessonRefetch } = useGetLessonByIdQuery({ variables: { getLessonByIdId: pathname } });

  useEffect(() => {
    const getByLessonIdData = lessonData?.getLessonById as Lesson[];
    setNewLesson(getByLessonIdData);
    lessonRefetch();
  }, [lessonData, lessonLoading, lessonError]);

  const { data, loading, error, refetch } = useGetCourseByIdQuery({ variables: { getCourseByIdId: pathname } });
  useEffect(() => {
    const getByIdData = data?.getCourseById;
    setNewCourse(getByIdData);
    refetch();
  }, [data, loading, error]);

  if (loading || lessonLoading) return <Loading />;

  return (
    <div data-cy="idCourse" className="bg-[#F7F7F8] dark:bg-[#121316f7] h-screen">
      <CourseRender data-cy-id="courseId" data={newCourse} lessonData={newLesson} lessonRefetch={lessonRefetch} />
    </div>
  );
};
export default Home;
