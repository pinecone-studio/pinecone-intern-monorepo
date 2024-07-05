'use client';

import { LessonCard } from '@/components/LessonCard';
import { useGetLessonsQuery } from '@/generated';
import { useParams } from 'next/navigation';

export const Lessons = () => {
  const { courseId } = useParams();

  const { data, loading, error } = useGetLessonsQuery({
    variables: { courseId: courseId },
  });

  if (error) {
    return <div data-testid="error-message">Error: {error.message}</div>;
  }

  if (loading || !data) {
    return <div data-testid="loading">Loading...</div>;
  }

  console.log('Lessons: ', data);

  return (
    <div data-testid="lessons-list">
      <div className="flex flex-col gap-3">
        {data?.getLessons?.map((lesson) => (
          // eslint-disable-next-line react/jsx-key
          <div key={lesson?.id} data-testid={`lesson-${lesson?.id}`}>
            <LessonCard title={lesson?.title} id={lesson?.id} href={`/student/${courseId}/${lesson?.id}`} />
          </div>
        ))}
      </div>

      {data?.getLessons?.length === 0 && <div data-testid="no-lessons">No lesson found.</div>}
    </div>
  );
};
