'use client';

import { useGetCourseQuery } from '@/generated';
import { useParams } from 'next/navigation';
import { Lessons } from '../_features/Lessons';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { ActionLinkButton } from '@/components/ActionLinkButton';
import { Quiz } from '../_features/Quiz';

const CourseDetail = () => {
  const { courseId } = useParams();

  const { data, loading, error } = useGetCourseQuery({
    variables: { id: courseId },
  });

  if (error) {
    return <div data-testid="error-message">Error: {error.message}</div>;
  }

  if (loading || !data) {
    return <div data-testid="loading">Loading...</div>;
  }

  return (
    <div data-testid="course-details" className="mx-auto container mb-4">
      <ActionLinkButton label="Hүүр хуудас" href={'/student'} Icon={ArrowLeft} />
      <div className="bg-white mt-5 p-5 rounded-[12px]">
        <div className="grid grid-cols-3 gap-5 ">
          <div className="col-span-2 flex flex-col gap-10">
            <h1 data-testid="course-title" className="text-8xl font-bold">
              {data.getCourse?.title}
            </h1>
            <p data-testid="course-content" className="text-lg">
              {data.getCourse?.content}
            </p>
            <Lessons />
            <Quiz/>
          </div>
          <div>{data.getCourse?.thumbnail ? <Image src={data.getCourse.thumbnail} alt="Course Thumbnail" width={500} height={300} /> : <></>}</div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
