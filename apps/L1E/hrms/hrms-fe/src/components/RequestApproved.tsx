'use client';

import { PiTagThin } from 'react-icons/pi';
import { CiCalendar } from 'react-icons/ci';
import { IoMdTime } from 'react-icons/io';
import { Button } from '@/components/ui/button';
import { IoClose } from 'react-icons/io5';
import { FaCheck } from 'react-icons/fa6';

export const RequestApproved = () => {
  return (
    <div className=" flex flex-col w-[608px]  h-[371px] border rounded-xl p-8">
      <div className=" flex flex-row gap-[200px]">
        <div className="flex flex-col gap-[6px]">
          <div className="w-[122px] h-5 border rounded-xl text-xs p-[2px] flex items-center justify-center">Хүлээгдэж байна</div>
          <div className="text-xl font-semibold">B.Enkhjin</div>
        </div>
        <div className="flex flex-col ">
          <div className="text-sm font-medium text-[#71717A]">Хүсэлт явуулсан огноо:</div>
          <div className="text-sm font-medium ">2024/08/26 10:45:03</div>
        </div>
      </div>
      <div className="flex flex-row space-x-24 mt-8 text-xs font-medium text-[#71717A]">
        <div className="flex flex-row gap-2">
          <PiTagThin className="w-4 h-4" />
          <div>Ангилал</div>
        </div>
        <div className="flex flex-row gap-2">
          <CiCalendar className="w-4 h-4" />
          <div>Огноо</div>
        </div>
        <div className="flex flex-row gap-2">
          <IoMdTime className="w-4 h-4" />
          <div>Цаг</div>
        </div>
        <div className="flex flex-row gap-2 ">
          <CiCalendar className="w-4 h-4" />
          <div>Нийт</div>
        </div>
      </div>
      <div className="flex flex-row space-x-24 mt-2 text-xs font-medium text-[#09090B] ml-6">
        <div>Чөлөө</div>
        <div>2024/10/25</div>
        <div>10:00-13:00</div>
        <div>1 хоног </div>
      </div>
      <div className="border-b-2 mt-8"></div>
      <div className="text-[#71717A] text-sm font-normal mt-8">Чөлөө авах шалтгаан</div>
      <div className="text-md text-[#09090B] mt-2">Хотоос гарах ажил гарсан тул чөлөө олгоно уу.</div>
      <div className="flex flex-row mt-8 gap-2 justify-end">
        <Button className="bg-[#F4F4F5] text-[#18181B] gap-[5px]">
          <IoClose />
          <p>Татгалзах</p>
        </Button>
        <Button className="gap-2 text-[#FAFAFA] bg-[#18181B] ">
          <FaCheck />
          <p>Зөвшөөрөх</p>
        </Button>
      </div>
    </div>
  );
};
