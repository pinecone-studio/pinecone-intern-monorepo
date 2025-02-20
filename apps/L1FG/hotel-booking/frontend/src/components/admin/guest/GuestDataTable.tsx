'use client';

import * as React from 'react';
import { ChevronsUpDownIcon } from 'lucide-react';
import { Booking, useGetHotelByIdQuery, useGetRoomByIdQuery } from '@/generated';
import Link from 'next/link';

interface GuestDataTableProps {
  data: Array<Booking>;
}

interface GuestRowProps {
  guest: Booking;
  index: number;
}

// Status class helper function
const getStatusClass = (status: string) => {
  const statusMap: Record<string, string> = {
    Completed: 'bg-[#18BA51]',
    Cancelled: 'bg-[#F97316]',
    Booked: 'bg-[#2563EB]',
  };
  return statusMap[status] || 'bg-[#2563EB]';
};

// Date formatting helper function
const formatDateRange = (start: string | undefined | null, end: string | undefined | null) => {
  if (!start || !end) return '-/-';

  const startDate = new Date(start);
  const endDate = new Date(end);

  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
  return `${new Intl.DateTimeFormat('en-US', options).format(startDate)} - ${new Intl.DateTimeFormat('en-US', options).format(endDate)}`;
};

// Hotel and room data query helper function
const useHotelAndRoomData = (guest: Booking) => {
  const { data: hotelQueryData } = useGetHotelByIdQuery({
    variables: { getHotelByIdId: guest?.hotelId || '' },
    skip: !guest?.hotelId,
  });

  const { data: roomQueryData } = useGetRoomByIdQuery({
    variables: { getRoomByIdId: guest?.roomId || '' },
    skip: !guest?.roomId,
  });

  return { hotelData: hotelQueryData?.getHotelById, roomData: roomQueryData?.getRoomById };
};

const GuestRow = ({ guest, index }: GuestRowProps) => {
  const { hotelData, roomData } = useHotelAndRoomData(guest);

  const formattedId = String(index + 1).padStart(4, '0');

  return (
    <Link href={`/admin/guests/${guest?.id}`} className="flex items-center border-t border-[#E4E4E7] h-[36px] hover:bg-[#FAFAFA] transition-all duration-200">
      <p className="px-4 py-2 max-w-[82px] w-full text-[#09090B] font-Inter text-sm font-normal h-full flex items-center border-r border-[#E4E4E7]">{formattedId}</p>
      <p className="px-4 py-2 max-w-[291px] w-full text-[#09090B] font-Inter text-sm font-normal h-full flex items-center border-r border-[#E4E4E7]">{guest?.cardName}</p>
      <p className="px-4 py-2 max-w-[291px] w-full text-[#09090B] font-Inter text-sm font-normal h-full flex items-center border-r border-[#E4E4E7]">{hotelData?.name}</p>
      <p className="px-4 py-2 max-w-[291px] w-full text-[#09090B] font-Inter text-sm font-normal h-full flex items-center border-r border-[#E4E4E7]">{roomData?.name}</p>
      <p className="px-4 py-2 max-w-[211px] w-full text-[#09090B] font-Inter text-sm font-normal h-full flex items-center border-r border-[#E4E4E7]">{formattedId}</p>
      <p className="px-4 py-2 max-w-[291px] w-full text-[#09090B] font-Inter text-sm font-normal h-full flex items-center border-r border-[#E4E4E7]">
        {formatDateRange(guest?.startDate, guest?.endDate || '-/-')}
      </p>
      <div className="px-4 py-2 max-w-[164px] w-full h-full flex items-center">
        <p className={`px-[10px] py-[2px] rounded-full text-[#FAFAFA] font-Inter text-xs font-semibold transition-all duration-200 ${getStatusClass(guest?.status || '')}`}>{guest?.status || '-/-'}</p>
      </div>
    </Link>
  );
};

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
        {data?.map((guest, index) => (
          <GuestRow key={guest?.id} guest={guest} index={index} />
        ))}
      </div>
    </div>
  );
};
