'use client';

import * as React from 'react';
import { ChevronsUpDownIcon } from 'lucide-react';
import { Booking } from '@/generated';
import Link from 'next/link';

interface GuestDataTableProps {
  data: Array<Booking>;
}

export const GuestDataTable = ({ data }: GuestDataTableProps) => {
  return (
    <div className="w-full">
      <div className="rounded-[6px] border bg-white overflow-hidden">
        <div className="flex items-center">
          <p className="px-4 py-2 max-w-[82px] w-full text-[#09090B] font-Inter text-sm font-normal h-10 flex items-center border-r border-[#E4E4E7]">ID</p>
          <p className="px-4 py-2 max-w-[291px] w-full text-[#09090B] font-Inter text-sm font-semibold h-10 flex items-center border-r border-[#E4E4E7]">Name</p>
          <div className="px-4 py-2 flex items-center justify-between max-w-[291px] w-full h-10  border-r border-[#E4E4E7]">
            <p className="text-[#09090B] font-Inter text-sm font-semibold">Hotel</p>
            <ChevronsUpDownIcon width={16} height={16} />
          </div>
          <div className="px-4 py-2 flex items-center justify-between max-w-[291px] w-full h-10 border-r border-[#E4E4E7]">
            <p className="text-[#09090B] font-Inter text-sm font-semibold">Rooms</p>
            <ChevronsUpDownIcon width={16} height={16} />
          </div>
          <p className="px-4 py-2 max-w-[211px] w-full text-[#09090B] font-Inter text-sm font-semibold h-10 flex items-center border-r border-[#E4E4E7]">Guests</p>
          <p className="px-4 py-2 max-w-[291px] w-full text-[#09090B] font-Inter text-sm font-semibold h-10 flex items-center border-r border-[#E4E4E7]">Date</p>
          <div className="px-4 py-2 flex items-center justify-between max-w-[164px] w-full h-10">
            <p className="text-[#09090B] font-Inter text-sm font-semibold">Status</p>
            <ChevronsUpDownIcon width={16} height={16} />
          </div>
        </div>
        {data?.map((guest, index) => {
          const formattedId = String(index + 1).padStart(4, '0');
          return (
            <Link href={`/admin/guests/${guest?.id}`} key={guest?.id} className="flex items-center border-t border-[#E4E4E7] h-[36px] hover:bg-[#FAFAFA] transition-all duration-200">
              <p className="px-4 py-2 max-w-[82px] w-full text-[#09090B] font-Inter text-sm font-normal h-full flex items-center border-r border-[#E4E4E7]">{formattedId}</p>
              <p className="px-4 py-2 max-w-[291px] w-full text-[#09090B] font-Inter text-sm font-normal h-full flex items-center border-r border-[#E4E4E7]">{guest?.cardName}</p>
              <p className="px-4 py-2 max-w-[291px] w-full text-[#09090B] font-Inter text-sm font-normal h-full flex items-center border-r border-[#E4E4E7]">{formattedId}</p>
              <p className="px-4 py-2 max-w-[291px] w-full text-[#09090B] font-Inter text-sm font-normal h-full flex items-center border-r border-[#E4E4E7]">{formattedId}</p>
              <p className="px-4 py-2 max-w-[211px] w-full text-[#09090B] font-Inter text-sm font-normal h-full flex items-center border-r border-[#E4E4E7]">{formattedId}</p>
              <p className="px-4 py-2 max-w-[291px] w-full text-[#09090B] font-Inter text-sm font-normal h-full flex items-center border-r border-[#E4E4E7]">{formattedId}</p>
              <div className="px-4 py-2 max-w-[164px] w-full h-full flex items-center">
                <p className="font-Inter text-xs font-semibold px-[10px] py-[2px] rounded-full bg-[#2563EB] text-[#FAFAFA]">{guest?.status}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
