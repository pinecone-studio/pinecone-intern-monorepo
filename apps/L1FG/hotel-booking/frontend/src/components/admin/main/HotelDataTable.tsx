'use client';

import { ChevronsUpDownIcon } from 'lucide-react';
import { Hotel } from '@/generated';
import Image from 'next/image';
import { Star } from '../svg';
import Link from 'next/link';
import { useState } from 'react';

interface AdminDataTableProps {
  data: Array<Hotel>;
}

export const HotelDataTable = ({ data }: AdminDataTableProps) => {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [sortOrderRooms, setSortOrderRooms] = useState<'asc' | 'desc'>('desc');
  const [sortOrderStars, setSortOrderStars] = useState<'asc' | 'desc'>('desc');
  const [sortBy, setSortBy] = useState<'rating' | 'amenities' | 'stars'>('amenities');

  const handleSortUserRating = () => {
    setSortBy('rating');
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const handleSortRooms = () => {
    setSortBy('amenities');
    setSortOrderRooms((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const handleSortStars = () => {
    setSortBy('stars');
    setSortOrderStars((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const compareNumbers = (a: number | null | undefined, b: number | null | undefined, order: 'asc' | 'desc') => {
    const numA = a ?? 0;
    const numB = b ?? 0;
    return order === 'asc' ? numA - numB : numB - numA;
  };

  const compareByRating = (a: Hotel, b: Hotel) => compareNumbers(a.rating, b.rating, sortOrder);
  const compareByStars = (a: Hotel, b: Hotel) => compareNumbers(a.starRating, b.starRating, sortOrderStars);
  const compareByAmenities = (a: Hotel, b: Hotel) => compareNumbers(a.amenities?.length, b.amenities?.length, sortOrderRooms);

  const getComparator = () => {
    switch (sortBy) {
      case 'rating':
        return compareByRating;
      case 'stars':
        return compareByStars;
      default:
        return compareByAmenities;
    }
  };

  const sortedData = [...data].sort(getComparator());

  return (
    <div className="w-full">
      <div className="rounded-[6px] border bg-white overflow-hidden">
        <div className="flex items-center">
          <p className="px-4 py-2 max-w-[82px] w-full text-[#09090B] font-Inter text-sm font-normal h-10 flex items-center border-r border-[#E4E4E7]">ID</p>
          <p className="px-4 py-2 max-w-[892px] w-full text-[#09090B] font-Inter text-sm font-semibold h-10 flex items-center border-r border-[#E4E4E7]">Name</p>
          <button onClick={handleSortRooms} className="px-4 py-2 flex items-center justify-between max-w-[320px] w-full h-10  border-r border-[#E4E4E7] hover:bg-[#FAFAFA] transition-all duration-200">
            <p className="text-[#09090B] font-Inter text-sm font-semibold">Rooms</p>
            <ChevronsUpDownIcon width={16} height={16} />
          </button>
          <button onClick={handleSortStars} className="px-4 py-2 max-w-[164px] w-full flex items-center justify-between h-10 border-r border-[#E4E4E7] hover:bg-[#FAFAFA] transition-all duration-200">
            <p className="text-[#09090B] font-Inter text-sm font-semibold">Stars Rating</p>
            <ChevronsUpDownIcon width={16} height={16} />
          </button>
          <button onClick={handleSortUserRating} className="px-4 py-2 flex items-center justify-between max-w-[164px] w-full h-10 hover:bg-[#FAFAFA] transition-all duration-200">
            <p className="text-[#09090B] font-Inter text-sm font-semibold">User Rating</p>
            <ChevronsUpDownIcon width={16} height={16} />
          </button>
        </div>
        {sortedData?.map((hotel, index) => {
          const formattedId = String(index + 1).padStart(4, '0');
          return (
            <Link href={`/admin/hotel-detail/${hotel?.id}`} key={hotel?.id} className="flex items-center border-t border-[#E4E4E7] h-[64px] hover:bg-[#FAFAFA] transition-all duration-200">
              <p className="px-4 py-2 max-w-[82px] w-full text-[#09090B] font-Inter text-sm font-normal h-full flex items-center border-r border-[#E4E4E7]">{formattedId}</p>
              <div className="px-4 py-2 max-w-[892px] w-full flex items-center border-r h-full  border-[#E4E4E7] gap-2">
                <div className="relative w-12 h-12">
                  <Image src={hotel?.images[0]} alt="Hotel" width={48} height={48} className="rounded-md object-cover w-full h-full" />
                </div>
                <p className="text-[#09090B] font-Inter text-sm font-normal">{hotel?.name}</p>
              </div>
              <div className="px-4 py-2 flex items-center max-w-[320px] w-full h-full  border-r border-[#E4E4E7]">
                <div className="flex gap-2 items-center">
                  {hotel?.amenities?.slice(0, 3).map((amenity, index) => (
                    <p key={index} className="px-[10px] py-[2px] text-[#18181B] font-Inter text-xs font-semibold bg-[#F4F4F5] rounded-full">
                      {amenity}
                    </p>
                  ))}
                  {hotel?.amenities && hotel.amenities.length > 3 && (
                    <p className="px-[10px] py-[2px] text-[#18181B] font-Inter text-xs font-semibold bg-[#F4F4F5] rounded-full">+{hotel.amenities.length - 3}</p>
                  )}
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
