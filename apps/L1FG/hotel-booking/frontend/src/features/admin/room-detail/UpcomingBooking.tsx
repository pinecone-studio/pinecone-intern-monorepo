'use client';

import { RoomDataTable } from '@/components/admin/add-room';
import { Booking, useGetBookingsByRoomIdQuery } from '@/generated';
import { useParams } from 'next/navigation';

export const UpcomingBooking = () => {
  const params = useParams();
  const roomId = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const { data } = useGetBookingsByRoomIdQuery({
    variables: { roomId: roomId || '' },
    skip: !roomId,
  });

  if (!roomId) {
    console.error('Room ID is missing');
    return;
  }

  const bookings = data?.getBookingsByRoomId?.filter((booking): booking is Booking => booking !== null) ?? [];

  return (
    <div className="border rounded-[8px] border-[#E4E4E7] bg-white flex flex-col gap-4 p-6">
      <p className="font-Inter text-[#09090B] text-lg font-semibold h-9">Upcoming Bookings</p>
      <RoomDataTable data={bookings} />
    </div>
  );
};
