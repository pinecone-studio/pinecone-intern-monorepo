import * as React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

const truncateLines: React.CSSProperties = {
  display: '-webkit-box',
  WebkitLineClamp: 3,
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
      <Card data-testid="test-card" className="flex flex-col justify-between border-[#0000001A] hover:border-gray-300 bg-white hover:bg-gray-50 rounded-[12px] w-[310px] cursor-pointer">
        {thumbnail ? <Image src={thumbnail} alt="Course Thumbnail" width={500} height={300} className="rounded-t-[11px] h-[120px] object-cover" quality={100} /> : <></>}
        <div className="flex flex-col gap-2 p-4">
          <CardTitle data-testid="lessonTile" className="font-semibold text-base">
            {title}
          </CardTitle>
          <CardDescription style={truncateLines} data-testid="lessonDesc" className="line-clamp-3 text-[#3F4145]">
            {content}
          </CardDescription>
          <Badge variant="outline" data-testid="lessonCount" className="w-fit text-sm">
           Lessons
          </Badge>
        </div>
      </Card>
    </Link>
  );
};