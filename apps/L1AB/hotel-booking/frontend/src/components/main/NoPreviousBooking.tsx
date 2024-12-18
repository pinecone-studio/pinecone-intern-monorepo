import { History } from 'lucide-react';

export const NoPreviousBooking = ({ name }: { name: string }) => {
  return (
    <div className="mt-12">
      <h3 className="text-2xl font-semibold mb-3">Previous Booking</h3>

      <div className="flex flex-col justify-center items-center">
        <div className=" text-[#71717A] text-sm">
          <History className="w-5 h-5" />
        </div>
        <div className="text-sm font-medium text-[#09090B]">No Previous Bookings {name}</div>
        <div className="text-sm font-normal text-[#71717A] mb-96">&quot;Your past stays will appear here once completed.&quot;</div>
      </div>
    </div>
  );
};
