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

  console.log('Lessons: ', data);

  return (
    <div>
      {data?.getCourses?.map((course) => (
        <div key={course?.id}>
          <CourseCard title={course?.title} content={course?.content} />
        </div>
      ))}
    </div>
  );
};
