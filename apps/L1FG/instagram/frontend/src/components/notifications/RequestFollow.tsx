'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';

export const RequestFollow = () => {
  return (
    <div className="flex items-center mt-4 h-[60px] py-2 px-6 mb-2">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className=" ml-2 text-sm break-words ">
        <Link className="font-bold mr-2 text-base " href={'/'}>
          {'name'}
        </Link>
        requested to follow you
      </div>

      <div className="flex gap-2">
        <button className="bg-[#2563EB] h-[36px] w-[86px] text-white rounded-md">Confirm</button>
        <button className="bg-[#F4F4F5] h-[36px] w-[86px] rounded-md">Delete</button>
      </div>
    </div>
  );
};
