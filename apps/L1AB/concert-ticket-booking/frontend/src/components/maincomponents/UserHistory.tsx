'use client';

import { MdAccessTime } from 'react-icons/md';
import { GoDotFill } from 'react-icons/go';

export const UserHistory = () => {
  return (
    <div className="w-full h-fit flex flex-col gap-6 ">
      <p className="font-semibold text-2xl text-white">Захиалагчийн мэдээлэл</p>
      <div className="p-8 grid gap-2 text-[#FAFAFA] bg-[#18181B] rounded-xl">
        <div className="flex justify-between items-center text-base font-normal text-white">
          <div className="flex gap-4">
            <div className="flex gap-2">
              <p className="text-[#bdbbbb]">Захиалгын дугаар: </p>
              <p>#23583</p>
            </div>
            <div className="flex text-base font-normal text-white items-center gap-2">
              <MdAccessTime />
              <p>2024.10.21</p>
            </div>
          </div>
          <button className="text-sm font-medium px-3 py-2 bg-[#27272A] rounded-md hover:bg-[#00B7F4] hover:text-black">Цуцлах</button>
        </div>
        <div className='flex flex-col gap-2'>
          <div className="border px-6 py-4 flex justify-between rounded-lg border-dashed border-[#27272A] ">
            <div className="flex items-center gap-2 text-sm font-bold text-white">
              <GoDotFill size={24} />
              <p>Арын тасалбар</p>
            </div>
            <div className="flex items-center font-normal text-base gap-2">
              <span>89’000₮</span>
              <span>x 2</span>
              <span>178’000₮</span>
            </div>
          </div>
          <div className="border px-6 py-4 flex justify-between rounded-lg border-dashed border-[#27272A] ">
            <div className="flex items-center gap-2 text-sm font-bold text-[#00B7F4]">
              <GoDotFill size={24}/>
              <p>VIP тасалбар</p>
            </div>
            <div className="flex items-center font-normal text-base gap-2">
              <span>99’000₮</span>
              <span>x 8</span>
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
