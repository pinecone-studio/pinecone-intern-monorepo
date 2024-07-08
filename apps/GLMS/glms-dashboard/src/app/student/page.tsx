'use client';

import { CourseCard } from '@/components/CourseCard';
import { useGetCoursesQuery } from '@/generated';

const Student = () => {
  const { data, loading, error } = useGetCoursesQuery();

  if (error) {
    return <div data-testid="error-message">Error: {error.message}</div>;
  }

  if (loading || !data) {
    return <div data-testid="loading">Loading...</div>;
  }

  return (
    <main className="container mx-auto h-[700px] bg-white my-4 rounded-[12px] py-4">
      <h1 className="text-text-primary font-inter text-2xl font-bold leading-tight letter-spacing-negative">Сэдвүүд</h1>
      <div className="grid grid-cols-4 gap-6 mt-4">
        {data?.getCourses?.map((course) => (
          <div key={course?.id} className="">
            <CourseCard href={`/student/${course?.id}`} title={course?.title} content={course?.content} thumbnail={course?.thumbnail} />
          </div>
        ))}
      </div>
    </main>
  );
};

export default Student;
