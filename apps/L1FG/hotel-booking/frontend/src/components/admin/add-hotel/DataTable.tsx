'use client';

import * as React from 'react';
import { HistoryIcon } from 'lucide-react';
import { Booking, useGetRoomByIdQuery } from '@/generated';

interface AdminDataTableProps {
  data: Array<Booking>;
}

export const HotelDataTable = ({ data }: AdminDataTableProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      timeZone: 'UTC',
    });
  };

  const calculateNights = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return Math.max(1, Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
  };

  // 🔑 Бүх өрөөний ID-г цуглуулж, урьдчилан мэдээллийг татаж байна
  const roomIds = data.map((hotel) => hotel.roomId).filter(Boolean);
  const { data: roomQueryData } = useGetRoomByIdQuery({
    variables: { getRoomByIdId: roomIds[0] || '' }, // Хэрэв олон өрөөний ID-г дэмждэг бол олон Query ашиглах эсвэл өөр API ашиглах
    skip: roomIds.length === 0,
  });

  return (
    <div className="w-full">
      <div className="rounded-[6px] border bg-white">
        <div className="flex items-center bg-[#F4F4F5] rounded-t-[6px]">
          <p className="px-4 py-2 max-w-[82px] w-full text-[#09090B] text-sm font-normal h-10 flex items-center border-r">ID</p>
          <p className="px-4 py-2 max-w-[278px] w-full text-[#09090B] text-sm font-semibold h-10 flex items-center border-r">Guest</p>
          <div className="px-4 py-2 flex items-center justify-between max-w-[188px] w-full h-10 border-r">
            <p className="text-[#09090B] text-sm font-semibold">Date</p>
          </div>
          <div className="px-4 py-2 flex items-center justify-between max-w-[188px] w-full h-10">
            <p className="text-[#09090B] text-sm font-semibold">Rooms</p>
          </div>
        </div>
        {data.length > 0 ? (
          data.map((hotel, index) => {
            const formattedId = String(index + 1).padStart(4, '0');
            const formattedStart = formatDate(hotel.startDate);
            const formattedEnd = formatDate(hotel.endDate);
            const nights = calculateNights(hotel.startDate, hotel.endDate);
            const roomData = roomQueryData?.getRoomById;

            return (
              <div key={hotel.id} className="flex items-center border-t h-[72px]">
                <p className="px-4 py-2 max-w-[82px] w-full text-sm flex items-center border-r">{formattedId}</p>
                <div className="px-4 py-2 max-w-[278px] w-full flex flex-col justify-center border-r">
                  <p className="text-[#09090B] text-sm">{hotel.cardName}</p>
                  <p className="text-[#71717A] text-sm">({hotel.email})</p>
                </div>
                <div className="px-4 py-2 flex flex-col justify-center max-w-[188px] w-full h-full border-r">
                  <p className="text-[#09090B] text-sm">
                    {formattedStart} - {formattedEnd}
                  </p>
                  <p className="text-[#71717A] text-sm">{nights} nights</p>
                </div>
                <p className="px-4 py-2 max-w-[188px] w-full text-[#09090B] text-sm flex items-center">{roomData?.name ?? 'Loading...'}</p>
              </div>
            );
          })
        ) : (
          <div className="py-8 flex flex-col gap-4 items-center border-t">
            <HistoryIcon color="#09090B" strokeOpacity={0.5} />
            <div className="flex flex-col gap-1 items-center">
              <p className="text-[#09090B] text-sm font-medium">No Upcoming Bookings</p>
              <p className="text-[#71717A] text-sm">You currently have no upcoming stays. Your future bookings will appear here once confirmed.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
