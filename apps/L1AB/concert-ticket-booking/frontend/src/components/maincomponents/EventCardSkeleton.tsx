import { Skeleton } from '@mui/material';
import { FiCalendar } from 'react-icons/fi';
import { IoLocationOutline } from 'react-icons/io5';

const eventData = new Array(12).fill(null);

export const EventCardSkeleton = () => {
  return (
    <div className="w-full grid grid-cols-3 gap-8 py-12">
      {eventData.map((_, index) => (
        <div key={index} className="border border-[#18181B] rounded-[8px]">
          <Skeleton className="h-[250px] w-full"></Skeleton>
          <div className="bg-[#131313] py-8 px-6 h-fit gap-6 grid">
            <div>
              <Skeleton className="w-[188px] h-[28px]"></Skeleton>
              <Skeleton className="w-[58px] h-6"></Skeleton>
            </div>
            <Skeleton className="w-[100px] h-8"></Skeleton>
            <div className="flex justify-between">
              <div className="flex gap-2 text-[#A1A1AA] items-center">
                <FiCalendar className="w-4 h-4 text-gray-800" />
                <Skeleton className="w-[40px] h-6"></Skeleton>
              </div>
              <div className="flex gap-2 text-[#A1A1AA] items-center">
                <IoLocationOutline className="w-4 h-4 text-gray-800" />
                <Skeleton className="w-[82px] h-6"></Skeleton>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
