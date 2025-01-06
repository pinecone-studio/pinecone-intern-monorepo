'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PiTagThin } from 'react-icons/pi';
import { CiCalendar } from 'react-icons/ci';
import { useState } from 'react';
import { Request } from '@/generated';
import { format } from 'date-fns';
/* eslint-enable no-unused-vars */
interface RequestListProps {
  filteredRequest: Request[];
  setSelectId: (_id: string) => void;
}
/* eslint-enable no-unused-vars */
export const RequestList = ({ filteredRequest, setSelectId }: RequestListProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const handleClick = (index: number, id: string) => {
    setActiveIndex(index);
    setSelectId(id);
  };

  const statusMessages = {
    PENDING: 'Хүлээгдэж байна',
    APPROVED: 'Баталгаажсан',
    REJECTED: 'Татгалзсан',
  };
  const requestStatus = {
    FREE: 'Чөлөө',
    PAID_LEAVE: 'Цалинтай чөлөө',
    REMOTE: 'Зайнаас ажиллах',
  };
  return (
    <div className="flex flex-col gap-1">
      {filteredRequest.map((el, index) => (
        <div
          data-testid={el._id}
          key={el._id}
          onClick={() => {
            handleClick(index, el._id);
          }}
          className={`cursor-pointer flex flex-row w-[414px] h-[86px] justify-between p-4 border rounded-xl ${activeIndex === index ? 'bg-white' : ''}`}
        >
          <div className="flex gap-4">
            <Avatar className="">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-[6px]">
              <div className="flex flex-row gap-[6px]">
                <div className="text-sm font-normal text-[#09090B]">khulan</div>
                <div className="text-xs font-normal text-[#71717A] mt-[2px]">3m</div>
              </div>
              <div className="flex flex-row w-[130px] gap-[6px] text-[#71717A]">
                <PiTagThin className="w-3 h-3" />
                <div className=" text-xs font-normal">{requestStatus[el.requestStatus] || ''}</div>
              </div>
              <div className="flex flex-row gap-[6px] text-[#71717A]">
                <CiCalendar className="w-3 h-3" />
                <div className=" text-xs font-normal">{el?.selectedDay && format(el?.selectedDay, 'yyyy/MM/dd')}</div>
              </div>
            </div>
          </div>
          <div className="w-[122px] h-5 border rounded-xl text-xs font-medium text-center bg-[#F9731633]">{el.requestType && statusMessages[el.requestType]}</div>
        </div>
      ))}
    </div>
  );
};
