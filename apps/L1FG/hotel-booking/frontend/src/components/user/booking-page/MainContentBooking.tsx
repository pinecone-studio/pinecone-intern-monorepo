import { NoBooking } from './NoBooking';
import { NoPrevious } from './NoPrevious';

export const MainContentBooking = () => {
  return (
    <div className="max-w-[960px] w-full mx-auto p-8 flex flex-col gap-8">
      <div className="w-full flex flex-col gap-4">
        <h3 className="text-2xl font-Inter font-semibold not-italic tracking-[-0.6px]">Comfirmed Booking</h3>
        {/* <BookingCard /> */}
        <NoBooking />
      </div>
      <div className="">
        <h3 className="text-2xl font-Inter font-semibold not-italic tracking-[-0.6px]">Previous Booking</h3>
        <NoPrevious />
      </div>
    </div>
  );
};
