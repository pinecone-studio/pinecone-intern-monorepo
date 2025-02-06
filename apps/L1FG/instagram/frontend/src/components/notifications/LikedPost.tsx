'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';

export const LikedPost = () => {
  return (
    <div className="justify-between flex items-center mt-4 h-[52px] py-2 px-6 mb-2">
      <div className="flex ">
        <div className="relative w-[54px] h-[32px]">
          <Avatar className="absolute left-0 top-0 bottom-2 w-8 h-8 border-2 border-white">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar className="absolute left-4 top-2 w-8 h-8 border-2 border-white">
            <AvatarImage src="https://randomuser.me/api/portraits/men/32.jpg" alt="@user2" />
            <AvatarFallback>U2</AvatarFallback>
          </Avatar>
        </div>
        <div className="w-[194px] items-center flex text-sm">
          <Link className="font-bold mr-2 text-base" href={'/'}>
            {'name'}
          </Link>
          liked your post
        </div>
      </div>
      <div style={{ backgroundImage: `url(${''})`, width: '44px', height: '44px' }} className=" bg-gray-200 rounded-sm"></div>
    </div>
  );
};
