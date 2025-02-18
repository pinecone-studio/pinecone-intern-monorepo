'use client';

import { Booking, useGetBookingsByHotelIdQuery } from '@/generated';
import { useParams } from 'next/navigation';
import { HotelDataTable } from '../../../components/admin/add-hotel';

export const UpcomingBooking = () => {
  const params = useParams();
  const hotelId = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const { data } = useGetBookingsByHotelIdQuery({
    variables: { hotelId: hotelId || '' },
    skip: !hotelId,
  });

  if (!hotelId) {
    console.error('Hotel ID is missing');
    return;
  }

  const bookings = data?.getBookingsByHotelId?.filter((booking): booking is Booking => booking !== null) ?? [];

  return (
    <div className="border rounded-[8px] border-[#E4E4E7] bg-white flex flex-col gap-4 p-6">
      <p className="font-Inter text-[#09090B] text-lg font-semibold h-9">Upcoming Bookings</p>
      <HotelDataTable data={bookings} />
    </div>
  );
};
