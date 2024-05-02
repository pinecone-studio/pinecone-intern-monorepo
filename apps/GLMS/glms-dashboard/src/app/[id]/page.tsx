'use client';
import { useGetCourseByIdQuery } from '@/generated/index';
import CourseRender from './_feature/CourseRender';
import { usePathname } from 'next/navigation';
const Home = () => {
  const pathName = usePathname().substring(1);
  const { data, loading, error } = useGetCourseByIdQuery({ variables: { getCourseByIdId: pathName } });
  const getByIdData = data?.getCourseById;
  
  if (loading)
    return (
      <div className=" w-full h-full flex justify-center items-center">
        <p className=" text-[40px] font-bold">Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className=" w-full h-full flex justify-center items-center">
        <p>Error: {error.message}</p>
      </div>
    );

  return (
    <div data-cy="idCourse">
      <CourseRender data-cy-id="courseId" data={getByIdData} />
    </div>
  );
};
export default Home;
