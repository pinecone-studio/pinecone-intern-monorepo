'use client';

// import { Booking, useGetBookingsQuery } from '@/generated';
// import { HotelDataTable } from './DataTable';

export const UpcomingBooking = () => {
  //   const { data } = useGetBookingsQuery();

  //   const bookings = (data?.getBookings || []).filter((booking): booking is Booking => booking !== null);

  return (
    <div className="border rounded-[8px] border-[#E4E4E7] bg-white flex flex-col gap-4 p-6">
      <p className="font-Inter text-[#09090B] text-lg font-semibold h-9">Upcoming Bookings</p>
      {/* <HotelDataTable data={bookings} /> */}
    </div>
  );
};
