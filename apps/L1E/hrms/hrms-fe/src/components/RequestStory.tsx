'use client';
import { PiTagThin } from 'react-icons/pi';
import { CiCalendar } from 'react-icons/ci';

const RequestStory = () => {
  return (
    <div className="flex flex-col gap-[7px]">
      <div className="flex flex-row gap-2 mt-4">
        <span className="text-base font-medium">10/15</span>
        <span className="text-[#09090B] text-base font-normal">Өнөөдөр</span>
      </div>
      <div className="flex flex-col gap-2 text-xs font-normal w-[684px] h-[96px] p-6 border  rounded-xl ">
        <div className="flex flex-row gap-2">
          <PiTagThin className="w-4 h-4 " />
          <div>Чөлөө (1 хоног)</div>
          <div className="w-[122px] h-5 text-xs font-medium rounded-full bg-[#F9731633] pt-[2px] pb-[2px] pl-[10px] pr-[10px] ">Хүлээгдэж байна</div>
        </div>
        <div className="flex flex-row gap-2">
          <CiCalendar className="w-4 h-4 " />
          <div>2024/10/25</div>
        </div>
      </div>
    </div>
  );
};
export default RequestStory;
