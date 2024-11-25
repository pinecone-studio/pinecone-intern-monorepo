import React from 'react';

import { Skeleton } from '@/components/ui/skeleton';

const eventData = new Array(12).fill(null);

export const RelatedEventsSkeleton = () => {
  return (
    <div className="h-fit px-28">
      <Skeleton className="h-[24px] bg-gray-900 w-[320px] "></Skeleton>
      <div className="w-full grid grid-cols-4 gap-8 py-12 ">
        {eventData.map((_, index) => (
          <div key={index} className="border border-[#18181B] rounded-[8px]">
            <Skeleton className="h-[250px] bg-gray-900 w-full"></Skeleton>
            <div className="bg-[#131313] py-8 px-6 h-fit gap-6 grid">
              <div className="h-fit gap-2 grid">
                <Skeleton className="w-[188px] h-[28px] bg-gray-800"></Skeleton>
                <Skeleton className="w-[80px] h-6 bg-gray-800"></Skeleton>
              </div>
              <Skeleton className="w-[100px] h-8 bg-gray-800"></Skeleton>
              <div className="flex justify-between">
                <div className="flex gap-2 text-[#A1A1AA] items-center">
                  <Skeleton className="w-4 h-4 bg-gray-800" />
                  <Skeleton className="w-[40px] h-6 bg-gray-800"></Skeleton>
                </div>
                <div className="flex gap-2 text-[#A1A1AA] items-center">
                  <Skeleton className="w-4 h-4 text-gray-800 bg-gray-800" />
                  <Skeleton className="w-[82px] h-6 bg-gray-800"></Skeleton>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
