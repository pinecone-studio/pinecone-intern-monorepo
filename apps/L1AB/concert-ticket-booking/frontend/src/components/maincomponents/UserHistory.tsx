'use client';

import { MdAccessTime } from 'react-icons/md';
import { GoDotFill } from 'react-icons/go';
import { UserHistoryDialog } from './UserHistoryDialog';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export const UserHistory = () => {

  return (
    <div className="w-full h-fit flex flex-col gap-6 ">
      <p className="font-semibold text-2xl text-white">Захиалагчийн мэдээлэл</p>
      <div className="p-8 grid gap-4 text-[#FAFAFA] bg-[#131313] rounded-xl">
        <div className="flex justify-between items-center text-base font-normal text-white">
          <div className="flex gap-4">
            <div className="flex gap-2">
              <p className="text-[#878787]">Захиалгын дугаар: </p>
              <p>#23583</p>
            </div>
            <div className="flex text-base font-normal text-white items-center gap-2">
              <MdAccessTime />
              <p>2024.10.21</p>
            </div>
          </div>
          <UserHistoryDialog />
          <div className='flex text-white items-center gap-2 text-sm font-medium'>
            <Label>Төлөв:</Label>
            <Button className='py-1 px-2 bg-[#27272A] '>Цуцлах хүсэлт илгээсэн</Button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="border px-6 py-4 flex justify-between rounded-lg border-dashed border-[#27272A] ">
            <div className="flex items-center gap-2 text-sm font-bold hover:text-[#00B7F4] text-white">
              <GoDotFill size={24} />
              <p>Арын тасалбар</p>
            </div>
            <div className="flex items-center font-normal text-base gap-2">
              <span className="text-[#878787]">89’000₮</span>
              <span className="text-[#878787]">x 2</span>
              <span>178’000₮</span>
            </div>
          </div>
          <div className="border px-6 py-4 flex justify-between rounded-lg border-dashed border-[#27272A] ">
            <div className="flex items-center gap-2 text-sm font-bold hover:text-[#00B7F4] text-white">
              <GoDotFill size={24} />
              <p>VIP тасалбар</p>
            </div>
            <div className="flex items-center font-normal text-base gap-2">
              <span className="text-[#878787]">99’000₮</span>
              <span className="text-[#878787]">x 8</span>
              <span>792’000₮</span>
            </div>
          </div>
        </div>
        <div className="flex justify-between px-6 py-3 ">
          <p className="text-sm font-light leading-5">Төлсөн дүн</p>
          <span className="text-xl font-bold">980’000₮</span>
        </div>
      </div>
    </div>
  );
};
