import Link from 'next/link';
import BookingSvg from './assets/BookingSvg';

export const StartBooking = ({ name }: { name: string }) => {
  return (
    <div className="p-3 ">
      <div>
        <h1 className="text-xl font-bold">Booking</h1>
      </div>
      <div className=" items-center justify-center flex flex-col gap-4 ">
        <div>
          <BookingSvg />
        </div>
        <h1>{name}, you have no upcoming trips. Where are you going next?</h1>
        <Link href="/">
          <button className="w-[124px] h-[36px] rounded-xl bg-blue-600 text-white flex items-center justify-center">Start Exploring</button>
        </Link>
      </div>
    </div>
  );
};
