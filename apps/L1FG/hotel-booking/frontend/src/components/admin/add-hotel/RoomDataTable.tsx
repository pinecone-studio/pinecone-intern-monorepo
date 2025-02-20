'use client';

import { ChevronsUpDownIcon, DoorClosed } from 'lucide-react';

import Image from 'next/image';
import { Room } from '@/generated';
import Link from 'next/link';
import { useState } from 'react';

interface AdminDataTableProps {
  data: Array<Room>;
}

export const RoomDataTable = ({ data }: AdminDataTableProps) => {
  const [sortPrice, setSortPrice] = useState<'asc' | 'desc'>('desc');

  const handleSortPrice = () => {
    setSortPrice((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const sortedData = [...data].sort((a, b) => {
    const priceA = a?.price != null ? a.price : 0;
    const priceB = b?.price != null ? b.price : 0;
    return sortPrice === 'asc' ? priceA - priceB : priceB - priceA;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {}).format(price);
  };

  return (
    <div className="w-full">
      <div className="rounded-[6px] border bg-white overflow-hidden">
        <div className="flex items-center bg-[#F4F4F5] rounded-t-[6px]">
          <p className="px-4 py-2 max-w-[82px] w-full text-[#09090B] font-Inter text-sm font-normal h-10 flex items-center border-r border-[#E4E4E7]">ID</p>
          <p className="px-4 py-2 max-w-[390px] w-full text-[#09090B] font-Inter text-sm font-semibold h-10 flex items-center border-r border-[#E4E4E7]">Name</p>
          <button onClick={handleSortPrice} className="px-4 py-2 flex items-center justify-between max-w-[148px] w-full h-10  border-r border-[#E4E4E7]">
            <p className="text-[#09090B] font-Inter text-sm font-semibold">Price</p>
            <ChevronsUpDownIcon width={16} height={16} />
          </button>
          <p className="px-4 py-2 max-w-[116px] w-full h-10 text-[#09090B] font-Inter text-sm font-semibold">Bed</p>
        </div>
        {sortedData?.length > 0 ? (
          sortedData?.map((room, index) => {
            const formattedId = String(index + 1).padStart(4, '0');
            return (
              <Link href={`/admin/room-detail/${room?.id}`} key={room?.id} className="flex items-center border-t border-[#E4E4E7] h-[72px] hover:bg-[#FAFAFA] transition-all duration-200">
                <p className="px-4 py-2 max-w-[82px] w-full text-[#09090B] font-Inter text-sm font-normal h-full flex items-center border-r border-[#E4E4E7]">{formattedId}</p>
                <div className="px-4 py-2 max-w-[390px] w-full flex items-center gap-3 border-r h-full border-[#E4E4E7]">
                  <div className="relative w-12 h-12 rounded-[6px] overflow-hidden">
                    <Image src={room?.images[0]} alt="Room" width={48} height={48} className="rounded-[6px] w-full h-full object-cover" />
                  </div>
                  <p className="text-[#09090B] font-Inter text-sm font-medium">{room?.name}</p>
                </div>
                <p className="px-4 py-2 flex max-w-[148px] w-full h-full items-center border-r border-[#E4E4E7] text-[#09090B] font-Inter text-sm font-normal">{formatPrice(room?.price || 0)}₮</p>
                <p className="px-4 py-2 flex items-center max-w-[116px] w-full h-full text-[#09090B] font-Inter text-sm font-medium">{room?.bed} bed</p>
              </Link>
            );
          })
        ) : (
          <div className="py-8 flex flex-col gap-4 items-center border-t border-[#E4E4E7]">
            <DoorClosed data-testid="door-closed-icon" color="#09090B" strokeOpacity={0.5} />
            <div className="flex flex-col gap-1 items-center">
              <p className="text-[#09090B] font-Inter text-sm font-medium">Room Types Not Set Up</p>
              <p className="text-[#71717A] font-Inter text-sm font-normal">Define room types to help guests choose the best stay option.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
