'use client';

import { LessonCard } from '@/components/LessonCard';
import { useGetLessonsQuery } from '@/generated';
import { useParams } from 'next/navigation';

export const Lessons = () => {
  const { courseId } = useParams();

  const { data, loading, error } = useGetLessonsQuery({
    variables: { courseId: courseId },
  });
  console.log('Lessons: ', data);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (loading || !data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex flex-col gap-3">
        {data?.getLessons?.map((lesson) => (
          // eslint-disable-next-line react/jsx-key
          <LessonCard customKey={lesson?.id} title={lesson?.title} id={lesson?.id} href={`/student/${courseId}/${lesson?.id}`} />
        ))}
      </div>

      {data?.getLessons?.length === 0 && <div>No lesson found.</div>}
    </div>
  );
};
