import Image from 'next/image';
import { BadgeBooked } from './BadgeBooked';

export const BookingCard = () => {
  return (
    <div className="w-full flex border border-[#E4E4E7] rounded-md ">
      <div className="relative min-w-[395px] h-[222px]">
        <Image src="/EconomySingleRoom.png" alt="Economy Single Room" className="rounded-t-[6px] w-full h-full object-cover" layout="fill" />
      </div>
      <div className="w-full p-5 flex flex-col justify-between">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <div className="flex">
              <BadgeBooked />
            </div>
            <div>
              <p className="font-Inter font-bold not-italic text-base leading-7">Flower Hotel Ulaanbaatar</p>
              <p className="font-Inter font-normal not-italic text-sm text-[#71717A]">Standard Room, City View, 1 Queen Bed</p>
            </div>
          </div>
          <p className="font-Inter font-medium not-italic text-sm">1 night • 1 adult • 1 room</p>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex items-center">
              <p className="w-[72px] font-Inter font-normal not-italic text-sm text-[#71717A]">Check in:</p>
              <p className="font-Inter font-medium not-italic text-sm">Monday, Jul 1, 3:00pm</p>
            </div>
            <div className="flex items-center">
              <p className="w-[72px] font-Inter font-normal not-italic text-sm text-[#71717A]">Itinerary:</p>
              <p className="font-Inter font-medium not-italic text-sm">72055771948934</p>
            </div>
          </div>
          <div className="flex items-end">
            <button className="px-3 py-2 border border-[#E4E4E7] rounded-md">
              <p className="font-Inter font-medium not-italic text-sm">View Detail</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
