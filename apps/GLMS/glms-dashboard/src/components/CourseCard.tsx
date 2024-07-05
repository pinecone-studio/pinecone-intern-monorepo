import * as React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

const truncateLines: React.CSSProperties = {
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

interface LessonCardProps {
  href: string;
  title: string | undefined;
  content: string | undefined;
  thumbnail: string | undefined;
}

export const CourseCard = ({ href, title, content, thumbnail }: LessonCardProps) => {
  return (
    <Link href={href}>
      <Card data-testid="test-card" className="cursor-pointer w-[310px] h-[240px] flex flex-col justify-between rounded-[12px] bg-white shadow-none border-[#0000001A]">
        {thumbnail ? <Image src={thumbnail} alt="Course Thumbnail" width={500} height={300} className="rounded-t-[11px] object-cover h-[116px]" quality={100} /> : <></>}
        <div className="flex flex-col px-4 mt-1 pb-3">
          <CardTitle data-testid="lessonTile" className="font-semibold text-base">
            {title}
          </CardTitle>
          <CardDescription style={truncateLines} data-testid="lessonDesc" className="mt-1 text-sm leading-5 font-inter text-[#3F4145] tracking-[-0.3px] font-normal">
            {content}
          </CardDescription>
          <Badge variant="secondary" data-testid="lessonCount" className="bg-[#C1E6CF] text-[#0A4E22] h-[24px] w-[81px] flex justify-center text-center font-normal text-base mt-[8px] ">
            Lessons
          </Badge>
        </div>
      </Card>
    </Link>
  );
};
