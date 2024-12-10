import { History } from 'lucide-react';

export const NoPreviousBooking = () => {
  return (
    <div className="mt-8">
      <h3 className="text-2xl font-semibold mb-3">Previous Booking</h3>

      <div className="flex flex-col justify-center items-center">
        <div className=" text-[#71717A] text-sm">
          <History className="w-5 h-5" />
        </div>
        <div className="text-sm font-medium text-[#09090B]">No Previous Bookings</div>
        <div className="text-sm font-normal text-[#71717A]">&quot;Your past stays will appear here once completed.&quot;</div>
      </div>
    </div>
  );
};
