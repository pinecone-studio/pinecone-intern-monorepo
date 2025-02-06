import { BookingCard } from './BookingCard';

export const Booked = () => {
  return (
    <main className="flex justify-center items-center">
      <div className="container flex flex-col w-full max-w-[960px] gap-8 p-8">
        <h3 className="text-2xl font-inter font-semibold leading-8 ">Comfirmed Booking</h3>
        <BookingCard />
      </div>
    </main>
  );
};
