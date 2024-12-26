'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PiTagThin } from 'react-icons/pi';
import { CiCalendar } from 'react-icons/ci';

export const RequestList = () => {
  return (
    <div className=" flex flex-row w-[414px] h-[86px] border rounded-xl  ">
      <Avatar className="mt-[19px] ml-4   ">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-[6px] ml-3 mt-3 ">
        <div className="flex flex-row gap-[6px]">
          <div className="text-sm font-normal text-[#09090B]">B.Enkhjin</div>
          <div className="text-xs font-normal text-[#71717A] mt-[2px]">3m</div>
        </div>
        <div className="flex flex-row gap-[6px] text-[#71717A]">
          <PiTagThin className="w-3 h-3" />
          <div className=" text-xs font-normal">Чөлөө (1 хоног)</div>
        </div>
        <div className="flex flex-row gap-[6px] text-[#71717A]">
          <CiCalendar className="w-3 h-3" />
          <div className=" text-xs font-normal">2024/10/25</div>
        </div>
      </div>
      <div className="w-[122px] h-5 border rounded-xl text-xs font-medium pl-3 mt-3 ml-[98px] bg-[#F9731633]">Хүлээгдэж байна</div>
    </div>
  );
};
