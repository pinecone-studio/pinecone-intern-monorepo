import { UpcomingBookingTable } from './DataTable';

export const UpcomingBooking = () => {
  return (
    <div className="border rounded-[8px] border-[#E4E4E7] bg-white flex flex-col gap-4 p-6">
      <p className="font-Inter text-[#09090B] text-lg font-semibold h-9">Upcoming Bookings</p>
      <UpcomingBookingTable />
    </div>
  );
};
