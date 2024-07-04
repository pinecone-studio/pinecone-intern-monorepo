import * as React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { CardMedia } from '@mui/material';

const truncateLines: React.CSSProperties = {
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

interface LessonCardProps {
  title: string | undefined;
  content: string | undefined;
}

export const CourseCard = ({ title, content }: LessonCardProps) => {
  return (
    <div className="flex gap-4 w-10/12 mx-auto">
      <Card data-testid="test-card" className=" cursor-pointer w-[282px] h-[240px] flex flex-col justify-between mt-3">
        <div className="h-[115px] w-100% cover">
          <CardMedia component="img" src="js.png" />
        </div>
        <div className="flex flex-col px-4 mt-1 pb-3">
          <CardTitle data-testid="lessonTile" className="font-semibold text-base">
            {title}
          </CardTitle>
          <CardDescription style={truncateLines} data-testid="lessonDesc" className="mt-1 text-sm">
            {content}
          </CardDescription>
          <Badge variant="secondary" data-testid="lessonCount" className="bg-[#C1E6CF] text-[#0A4E22] h-[24px] w-[81px] flex justify-center text-center font-light text-base mt-[8px] ">
            lessons
          </Badge>
        </div>
      </Card>
    </div>
  );
};
