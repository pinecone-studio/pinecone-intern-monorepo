import React from 'react';
import Image from 'next/image';
import { CiLocationOn,CiCalendar } from "react-icons/ci";
const ConcertCard = () => {
  return (
    <div className="w-[345px] rounded-2xl overflow-hidden shadow-lg bg-black text-white font-sans">
      <Image src={`/ConcertCardImg.png`} alt='' width="500" height="213" />
      <div className="border-t border-purple-500 p-6">
        <h2 className="text-xl font-semibold">Music of the Spheres</h2>
        <p className="text-gray-400 mb-4">coldplay</p>
        <p className="text-3xl font-bold mb-4">200’000$</p>
        <div className="flex items-center justify-between text-gray-400">
          <div className="flex items-center gap-2">
          <CiCalendar />
            <span>10.31</span>
          </div>
          <div className="flex items-center gap-2">
          <CiLocationOn />
            <span>UG ARENA</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConcertCard;
