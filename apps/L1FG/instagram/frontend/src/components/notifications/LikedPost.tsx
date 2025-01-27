'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';

export const LikedPost = () => {
  return (
    <div className="justify-between flex items-center mt-4 h-[52px] py-2 px-6 mb-2">
      <div className="flex">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="w-[194px] ml-2 items-center flex text-sm">
          <Link className="font-bold mr-2 text-base" href={'/'}>
            {'name'}
          </Link>
          liked your story
        </div>
      </div>
      <div style={{ backgroundImage: `url(${''})`, width: '44px', height: '44px' }} className=" bg-gray-200 rounded-sm"></div>
    </div>
  );
};
