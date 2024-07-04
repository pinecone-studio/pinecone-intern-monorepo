'use client';

import { ActionLinkButton } from '@/components/ActionLinkButton';
import { useGetLessonDetailsQuery } from '@/generated';
import { useParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';

const LessonDetails = () => {
  const { lessonId } = useParams();

  const { data, loading, error } = useGetLessonDetailsQuery({
    variables: { id: lessonId },
  });

  if (error) {
    return <div data-testid="error-message">Error: {error.message}</div>;
  }

  if (loading || !data) {
    return <div data-testid="loading">Loading...</div>;
  }

  return (
    <div className="mx-auto container mb-4" data-testid="lesson-details">
      <ActionLinkButton href={`/student/${data?.getLessonDetails?.courseId?.id}`} label="Сэдэв рүү буцах" Icon={ArrowLeft} />

      <div className="bg-white mt-5 p-5 rounded-[12px] flex justify-center">
        <div className="mx-20 flex flex-col gap-5">
          <h1 className="text-4xl font-bold leading-[44px] tracking-tight" data-testid="lesson-title">
            {data?.getLessonDetails?.title}
          </h1>
          <p className="text-base leading-[37px] tracking-[-0.3px]" data-testid="lesson-content">
            {data?.getLessonDetails?.content}
          </p>

          <div>
            {data.getLessonDetails?.thumbnail ? <Image src={data.getLessonDetails.thumbnail} alt="Lesson Thumbnail" width={1200} height={500} quality={100} data-testid="lesson-thumbnail" /> : <></>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonDetails;
