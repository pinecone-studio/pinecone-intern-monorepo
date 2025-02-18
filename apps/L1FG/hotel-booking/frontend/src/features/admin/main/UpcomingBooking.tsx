'use client';

import { Booking, useGetBookingsByHotelIdQuery } from '@/generated';
import { HotelDataTable } from '../../../components/admin/add-hotel/DataTable';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

export const UpcomingBooking = () => {
  const searchParams = useSearchParams();
  const hotelId = searchParams.get('id');

  const { data } = useGetBookingsByHotelIdQuery({
    variables: { hotelId: hotelId ?? '' },
    skip: !hotelId,
  });

  const bookings = useMemo(() => data?.getBookingsByHotelId?.filter((booking): booking is Booking => booking !== null) ?? [], [data]);

  return (
    <div className="border rounded-[8px] border-[#E4E4E7] bg-white flex flex-col gap-4 p-6">
      <p className="font-Inter text-[#09090B] text-lg font-semibold h-9">Upcoming Bookings</p>
      <HotelDataTable data={bookings} />
    </div>
  );
};
