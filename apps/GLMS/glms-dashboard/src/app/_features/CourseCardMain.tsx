import { CourseCard } from '@/components/CourseCard';
import { useGetCoursesQuery } from '@/generated';

export const CourseCardMain = () => {
  const { data, loading, error } = useGetCoursesQuery();

  if (error) {
    return <div data-testid="error-message">Error: {error.message}</div>;
  }

  if (loading || !data) {
    return <div data-testid="loading">Loading...</div>;
  }

  return (
    <div className="gap-6 grid grid-cols-4 mx-auto container">
      {data?.getCourses?.map((course) => (
        <div key={course?.id} className="flex justify-end">
          <CourseCard href={`/admin/${course?.id}`} title={course?.title} content={course?.content} thumbnail={course?.thumbnail} />
        </div>
      ))}
    </div>
  );
};
