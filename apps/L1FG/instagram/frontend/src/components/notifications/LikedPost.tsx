'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';

export const LikedPost = () => {
  return (
    <div className="justify-between flex items-center mt-4 h-[52px]">
      <div className="flex">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="w-[194px] ml-2 items-center flex">
          <Link className="font-bold" href={'/'}>
            {'name'}
          </Link>
          liked your story
        </div>
      </div>
      <div style={{ backgroundImage: `url(${''})`, width: '44px', height: '44px' }} className=" bg-gray-200 rounded-sm"></div>
    </div>
  );
};
