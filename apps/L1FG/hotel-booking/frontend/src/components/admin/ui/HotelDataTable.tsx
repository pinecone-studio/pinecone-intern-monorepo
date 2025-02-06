'use client';

import * as React from 'react';
import { ChevronsUpDownIcon } from 'lucide-react';
import { Hotel } from '@/generated';
import Image from 'next/image';
import { Star } from '../svg';
import Link from 'next/link';

interface AdminDataTableProps {
  data: Array<Hotel>;
}

export const HotelDataTable = ({ data }: AdminDataTableProps) => {
  return (
    <div className="w-full">
      <div className="rounded-[6px] border bg-white ">
        <div className="flex items-center">
          <p className="px-4 py-2 max-w-[82px] w-full text-[#09090B] font-Inter text-sm font-normal h-10 flex items-center border-r border-[#E4E4E7]">ID</p>
          <p className="px-4 py-2 max-w-[892px] w-full text-[#09090B] font-Inter text-sm font-semibold h-10 flex items-center border-r border-[#E4E4E7]">Name</p>
          <div className="px-4 py-2 flex items-center justify-between max-w-[320px] w-full h-10  border-r border-[#E4E4E7]">
            <p className="text-[#09090B] font-Inter text-sm font-semibold">Rooms</p>
            <ChevronsUpDownIcon width={16} height={16} />
          </div>
          <p className="px-4 py-2 max-w-[164px] w-full text-[#09090B] font-Inter text-sm font-semibold h-10 flex items-center border-r border-[#E4E4E7]">Stars Rating</p>
          <div className="px-4 py-2 flex items-center justify-between max-w-[164px] w-full h-10">
            <p className="text-[#09090B] font-Inter text-sm font-semibold">User Rating</p>
            <ChevronsUpDownIcon width={16} height={16} />
          </div>
        </div>
        {data?.map((hotel, index) => {
          const formattedId = String(index + 1).padStart(4, '0');
          return (
            <Link href={`/admin/${hotel.id}`} key={hotel?.id} className="flex items-center border-t border-[#E4E4E7] h-[64px] hover:bg-[#FAFAFA] transition-all duration-200">
              <p className="px-4 py-2 max-w-[82px] w-full text-[#09090B] font-Inter text-sm font-normal h-full flex items-center border-r border-[#E4E4E7]">{formattedId}</p>
              <div className="px-4 py-2 max-w-[892px] w-full flex items-center border-r h-full  border-[#E4E4E7] gap-2">
                <Image src="/EconomySingleRoom.png" alt="Economy Single Room" width={48} height={48} className="rounded-md" />
                <p className="text-[#09090B] font-Inter text-sm font-normal">{hotel?.name}</p>
              </div>
              <div className="px-4 py-2 flex items-center max-w-[320px] w-full h-full  border-r border-[#E4E4E7]">
                <div className="flex gap-2 items-center">
                  {hotel?.amenities?.map((amenities, index) => {
                    return (
                      <p key={index} className="px-[10px] py-[2px] text-[#18181B] font-Inter text-xs font-semibold bg-[#F4F4F5] rounded-full">
                        {amenities}
                      </p>
                    );
                  })}
                </div>
              </div>
              <div className="px-4 py-2 max-w-[164px] w-full h-full flex items-center gap-2 border-r border-[#E4E4E7]">
                <Star />
                <p className="text-[#09090B] font-Inter text-sm font-normal">{hotel?.starRating}</p>
              </div>
              <p className="px-4 py-2 flex items-center max-w-[164px] w-full h-full text-[#09090B] font-Inter text-sm font-normal">
                {hotel?.rating}
                <span className="text-[#71717A] font-Inter text-sm font-normal">/10</span>
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
