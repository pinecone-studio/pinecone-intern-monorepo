'use client';
import { Lesson, useGetCourseByIdQuery, useGetLessonByIdQuery } from '@/generated';
import CourseRender from './_feature/CourseRender';
import { usePathname } from 'next/navigation';
const Home = () => {
  const pathName = usePathname().substring(1);
  const { data, loading, error } = useGetCourseByIdQuery({ variables: { getCourseByIdId: pathName } });
  const { data: lessonData, loading: lessonLoading, error: lessonError } = useGetLessonByIdQuery({ variables: { getLessonByIdId: pathName } });
  const getByIdData = data?.getCourseById;
  const getByLessonIdData = lessonData?.getLessonById as Lesson[];
  if (loading || lessonLoading)
    return (
      <div className=" w-full h-full flex justif3y-center items-center">
        <p className=" text-[40px] font-bold m-auto w-full">Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className=" w-full h-full flex justify-center items-center">
        <p>Error: {error.message}</p>
      </div>
    );
  if (lessonError)
    return (
      <div className=" w-full h-full flex justify-center items-center">
        <p>Error: {lessonError.message}</p>
      </div>
    );

  return (
    <div data-cy="idCourse" className="bg-[#F7F7F8]">
      <CourseRender data-cy-id="courseId" data={getByIdData} lessonData={getByLessonIdData} />
    </div>
  );
};
export default Home;
