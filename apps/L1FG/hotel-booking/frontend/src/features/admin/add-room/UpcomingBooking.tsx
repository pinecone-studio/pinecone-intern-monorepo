'use client';

import { RoomDataTable } from '@/components/admin/add-room';
import { Booking, useGetBookingsByRoomIdQuery } from '@/generated';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

export const UpcomingBooking = () => {
  const searchParams = useSearchParams();
  const roomId = searchParams.get('id');

  const { data } = useGetBookingsByRoomIdQuery({
    variables: { roomId: roomId ?? '' },
    skip: !roomId,
  });

  const bookings = useMemo(() => data?.getBookingsByRoomId?.filter((booking): booking is Booking => booking !== null) ?? [], [data]);

  if (!roomId) {
    console.error('Room ID is missing');
    return;
  }

  return (
    <div className="border rounded-[8px] border-[#E4E4E7] bg-white flex flex-col gap-4 p-6">
      <p className="font-Inter text-[#09090B] text-lg font-semibold h-9">Upcoming Bookings</p>
      <RoomDataTable data={bookings} />
    </div>
  );
};
