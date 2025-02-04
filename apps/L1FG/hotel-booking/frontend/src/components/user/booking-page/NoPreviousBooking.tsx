import { HistoryIcon } from '../ui/svg/HistoryIcon';

export const NoPreviousBooking = () => {
  return (
    <main className="flex justify-center items-center">
      <div className="container flex flex-col w-full max-w-[960px] gap-4 p-8">
        <h3 className=" text-2xl font-semibold font-inter leading-8">Previous Booking</h3>
        <div className="flex flex-col justify-center items-center gap-4">
          <HistoryIcon />
          <div className="flex flex-col justify-center gap-1">
            <p className="text-sm font-medium font-inter leading-5 text-center mx-auto">No Previous Bookings</p>
            <p className="text-sm font-normal font-inter leading-5 text-[#71717A]">Your past stays will appear here once completed.</p>
          </div>
        </div>
      </div>
    </main>
  );
};
