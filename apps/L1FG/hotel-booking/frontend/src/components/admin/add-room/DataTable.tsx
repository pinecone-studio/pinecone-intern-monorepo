'use client';

import * as React from 'react';
import { ChevronsUpDownIcon, HistoryIcon } from 'lucide-react';
import { Booking } from '@/generated';

interface AdminDataTableProps {
  data: Array<Booking>;
}

export const RoomDataTable = ({ data }: AdminDataTableProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      timeZone: 'UTC',
    });
  };

  // const calculateNights = (startDate: string, endDate: string) => {
  //   const start = new Date(startDate);
  //   const end = new Date(endDate);
  //   return Math.max(1, Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
  // };
  return (
    <div className="w-full">
      <div className="rounded-[6px] border bg-white ">
        <div className="flex items-center bg-[#F4F4F5] rounded-t-[6px]">
          <p className="px-4 py-2 max-w-[82px] w-full text-[#09090B] font-Inter text-sm font-normal h-10 flex items-center border-r border-[#E4E4E7]">ID</p>
          <p className="px-4 py-2 max-w-[346px] w-full text-[#09090B] font-Inter text-sm font-semibold h-10 flex items-center border-r border-[#E4E4E7]">Guest name</p>
          <div className="px-4 py-2 flex items-center justify-between max-w-[120px] w-full h-10  border-r border-[#E4E4E7]">
            <p className="text-[#09090B] font-Inter text-sm font-semibold">Status</p>
            <ChevronsUpDownIcon width={16} height={16} />
          </div>
          <div className="px-4 py-2 flex items-center justify-between max-w-[188px] w-full h-10">
            <p className="text-[#09090B] font-Inter text-sm font-semibold">Date</p>
            <ChevronsUpDownIcon width={16} height={16} />
          </div>
        </div>
        {data?.length > 0 ? (
          data?.map((hotel, index) => {
            const formattedId = String(index + 1).padStart(4, '0');
            const formattedStart = formatDate(hotel.startDate);
            const formattedEnd = formatDate(hotel.endDate);
            // const nights = calculateNights(hotel.startDate, hotel.endDate);
            return (
              <div key={hotel?.id} className="flex items-center border-t border-[#E4E4E7] h-[72px]">
                <p className="px-4 py-2 max-w-[82px] w-full text-[#09090B] font-Inter text-sm font-normal h-full flex items-center border-r border-[#E4E4E7]">{formattedId}</p>
                <div className="px-4 py-2 max-w-[346px] w-full flex justify-center border-r h-full  border-[#E4E4E7] flex-col">
                  <p className="text-[#09090B] font-Inter text-sm font-normal">{hotel?.cardName}</p>
                  <p className="text-[#71717A] font-Inter text-sm font-normal">({hotel?.email})</p>
                </div>
                <div className="px-4 py-2 flex items-center max-w-[120px] w-full h-full border-r border-[#E4E4E7]">
                  <p className="bg-[#2563EB] rounded-full px-[10px] py-[2px] text-[#FAFAFA] text-xs font-semibold font-Inter">{hotel?.status}</p>
                </div>
                <div className="px-4 py-2  flex flex-col justify-center max-w-[188px] w-full h-full ">
                  <p className="text-[#09090B] font-Inter text-sm font-normal">
                    {formattedStart} - {formattedEnd}
                  </p>
                  <p className="text-[#71717A] font-Inter text-sm font-normal">{/* ({nights} night{nights > 1 ? 's' : ''}) */}</p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="py-8 flex flex-col gap-4 items-center border-t border-[#E4E4E7]">
            <HistoryIcon color="#09090B" strokeOpacity={0.5} />
            <div className="flex flex-col gap-1 items-center">
              <p className="text-[#09090B] font-Inter text-sm font-medium">No Upcoming Bookings</p>
              <p className="text-[#71717A] font-Inter text-sm font-normal">You currently have no upcoming stays. Your future bookings will appear here once confirmed.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
