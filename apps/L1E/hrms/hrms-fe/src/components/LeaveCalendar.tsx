'use client';

import { Button } from '@/components/ui/button';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { IoMdTime } from 'react-icons/io';
import { PiTagThin } from 'react-icons/pi';
import { GrEmoji } from 'react-icons/gr';

export const LeaveCalendar = () => {
  return (
    <div className="flex flex-col ml-[756px] mt-[48px] gap-4 ">
      <div className="text-xl font-semibold">Чөлөө авсан:</div>
      <div className="flex flex-row w-[608px] gap-[186px]">
        <Button>+ Чөлөө хүсэх</Button>
      </div>
      <div className="flex flex-col ">
        <div className="flex flex-row gap-2 mt-4">
          <span className="text-base font-medium">10/15</span>
          <span className="text-muted-foreground text-sm font-normal mt-[3px]">Өнөөдөр</span>
        </div>
      </div>
      <div className="w-[608px] h-[84px] flex flex-col gap-2 border rounded-xl justify-center items-center">Чөлөөний хүсэлт байхгүй байна.</div>
      <div className="w-[608px] h-[84px] flex flex-col gap-2 border rounded-xl justify-center items-center">
        <div>Өнөөдөр чөлөө авсан хүн байхгүй байна.</div>
        <GrEmoji />
      </div>
      <div className="flex flex-row gap-4 w-[608px] h-[96px] font-normal text-sm pt-5 pl-6 pb-5 rounded-xl border">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-2">
          <div> M.Khulan</div>
          <div className="flex flex-row gap-4">
            <IoMdTime className="w-5 h-5" />
            <div>09:00-11:00</div>
            <PiTagThin />
            <div>Чөлөө (1 хоног)</div>
          </div>
        </div>
      </div>
    </div>
  );
};
