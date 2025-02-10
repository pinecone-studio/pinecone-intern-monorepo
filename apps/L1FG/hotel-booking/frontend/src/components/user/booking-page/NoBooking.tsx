import Link from 'next/link';
import { NobookingIcon } from '../ui/svg/NoBookingIcon';

export const NoBooking = () => {
  return (
    <div className="w-full flex flex-col items-center gap-4">
      <NobookingIcon />
      <p className="font-Inter font-medium not-italic text-sm text-center w-[276px]">Shagai, you have no upcoming trips. Where are you going next?</p>
      <div className="">
        <Link href={'/'}>
          <button className="py-2 px-3 bg-[#2563EB] rounded-md">
            <p className="font-Inter font-medium not-italic text-sm text-white">Start Exploring</p>
          </button>
        </Link>
      </div>
    </div>
  );
};
