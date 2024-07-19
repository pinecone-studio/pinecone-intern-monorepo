'use client';

import { useGetCourseQuery } from '@/generated';
import { useParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { ActionLinkButton } from '@/components/ActionLinkButton';
import { Lessons } from './_features/Lessons';
import { CirclePlus } from 'lucide-react';

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
    <div data-testid="course-details" className="mx-auto mb-4 container">
      <ActionLinkButton label="Hүүр хуудас" href={'/'} Icon={ArrowLeft} />
      <div className="bg-white mt-5 p-5 rounded-[12px]">
        <div className="gap-5 grid grid-cols-3">
          <div className="flex flex-col gap-10 col-span-2">
            <h1 data-testid="course-title" className="font-bold text-8xl">
              {data.getCourse?.title}
            </h1>
            <p data-testid="course-content" className="text-lg">
              {data.getCourse?.content}
            </p>
            <div className="flex flex-col gap-2">
              <ActionLinkButton variant="outline" label="Add Lesson" Icon={CirclePlus} href={`/addLesson/${courseId}`} />
              <Lessons />
            </div>
          </div>
          <div>{data.getCourse?.thumbnail ? <Image src={data.getCourse.thumbnail} alt="Course Thumbnail" width={500} height={300} className='rounded-[12px]'/> : <></>}</div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
