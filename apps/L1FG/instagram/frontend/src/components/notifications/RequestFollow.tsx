'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const RequestFollow = () => {
  return (
    <div className=" flex items-center mt-4 h-[52px]">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="ml-2">
        <p className="text-sm font-bold">name</p>
        <p className="text-sm h-[32px]">has requested to follow you.</p>
      </div>
      <div className="flex gap-2">
        <button className="bg-[#2563EB] h-[36px] w-[86px] text-white rounded-md">Confirm</button>
        <button className="bg-[#F4F4F5] h-[36px] w-[86px] rounded-md">Delete</button>
      </div>
    </div>
  );
};
