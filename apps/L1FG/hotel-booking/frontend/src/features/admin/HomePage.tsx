'use client';

import { Header } from '@/components/admin/main/Header';
import { Sidebar } from '@/features/admin/main/Sidebar';
import { Plus } from '@/components/admin/svg';
import Link from 'next/link';
import { HotelDataTable, SelectLocation, SelectRoom, SelectStarRating, SelectUserRating } from '@/components/admin/ui';
import { useGetHotelsQuery } from '@/generated';

export const HomePage = () => {
  const { data } = useGetHotelsQuery();

  const hotels = data?.getHotels || [];

  return (
    <div className="flex">
      <Sidebar hotels="active" guests="" />
      <div className="flex flex-col w-full min-h-screen">
        <Header />
        <div className="w-full h-full bg-[#F4F4F5] flex justify-center">
          <div className="max-w-[1654px] w-full h-full p-4 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <p className="font-Inter text-2xl font-semibold -tracking-[0.6px] text-[#020617]">Hotels</p>
              <Link href="/admin/add-hotel" className="px-8 py-2 flex items-center gap-2 bg-[#2563EB] hover:bg-[#256eeb] duration-200 rounded-[6px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] h-10">
                <Plus />
                <p className="text-[#FAFAFA] font-Inter text-sm font-medium">Add Hotel</p>
              </Link>
            </div>
            <div className="flex gap-2">
              <input type="text" className="px-3 py-2 w-full outline-none border border-[#E4E4E7] rounded-[6px] text-[#09090B] font-Inter text-sm font-normal h-10" placeholder="Search" />
              <SelectLocation />
              <SelectRoom />
              <SelectStarRating />
              <SelectUserRating />
            </div>
            <HotelDataTable data={hotels} />
          </div>
        </div>
      </div>
    </div>
  );
};
