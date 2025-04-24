'use client';

import AboutEvent from './_components/AboutEvent';
import SeatInfo from './_components/SeatInfo';

const Page = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex">
        <div className="w-[70%]">
          <AboutEvent />
        </div>
        <div className="w-[30%]">
          <SeatInfo />
        </div>
      </div>
    </div>
  );
};

export default Page;
