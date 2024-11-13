import Image from 'next/image';
import { GoDotFill } from 'react-icons/go';
export const AdminNavbar = () => {
  return (
    <div className="py-4 px-6 h-fit flex flex-col gap-3 bg-white border-b">
      <div className="flex items-center justify-between">
        <div className="flex">
          <GoDotFill className="w-8 h-8" />
          <h1 className="text-black font-semibold text-2xl">TICKET BOOKING</h1>
        </div>
        <div className="w-8 h-8 relative">
          <Image src={'/AdminNavbarProfile.png'} fill alt="profile" />
        </div>
      </div>
    </div>
  );
};
