import Image from 'next/image';
import WifiIcon from '../svg/WifiIcon';
import FlowerIcon from '../svg/FlowerIcon';
import ParkingCircleIcon from '../svg/ParkingCircleIcon';
import UtensilsIcon from '../svg/UtensilsIcon';
import DumbBellIcon from '../svg/DumbBellIcon';
import BusIcon from '../svg/BusIcon';
import DoorClosedIcon from '../svg/DoorClosedIcon';
import ChevronRightIcon from '../svg/ChevronRightIcon';
import { PriceDetail } from '../../hotel-detail';

export const SinglePageCard = () => {
  return (
    <div className="max-w-[349px] w-full text-foreground border rounded-[6px]">
      <Image src="/EconomySingleRoom.png" alt="Economy Single Room" height={216} width={349} className="rounded-t-[6px]" />
      <div className="p-4">
        <div className="flex flex-col gap-4">
          <div className="font-Inter text-base font-bold leading-7">Economy Single Room</div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <WifiIcon />
              <p className="text-sm font-Inter font-normal leading-5">Free WiFi</p>
            </div>
            <div className="flex items-center gap-2">
              <FlowerIcon />
              <p className="text-sm font-Inter font-normal leading-5">Spa access</p>
            </div>
            <div className="flex items-center gap-2">
              <ParkingCircleIcon />
              <p className="text-sm font-Inter font-normal leading-5">Free self parking</p>
            </div>
            <div className="flex items-center gap-2">
              <UtensilsIcon />
              <p className="text-sm font-Inter font-normal leading-5">Complimentary breakfast</p>
            </div>
            <div className="flex items-center gap-2">
              <DumbBellIcon />
              <p className="text-sm font-Inter font-normal leading-5">Fitness center access</p>
            </div>
            <div className="flex items-center gap-2">
              <BusIcon />
              <p className="text-sm font-Inter font-normal leading-5">Airport shuttle service</p>
            </div>
            <div className="flex items-center gap-2">
              <DoorClosedIcon />
              <p className="text-sm font-Inter font-normal leading-5">Room cleaning service</p>
            </div>
            <button className="text-sm font-Inter font-medium leading-5 text-[#2563EB] flex gap-2 items-center py-2">
              <div>Show more</div>
              <ChevronRightIcon />
            </button>
          </div>
        </div>
        <div className="py-4">
          <div className="border"></div>
        </div>
        <div className="w-full">
          <div className="text-xs font-Inter font-normal leading-4 text-muted-foreground">Total</div>
          <div className="text-xl font-Inter font-medium leading-7">225,000₮</div>
          <div className="text-xs font-Inter font-normal leading-4 flex gap-1">
            <p className="font-Inter font-normal not-italic text-xs">112,500₮</p>
            <p>Price per night</p>
          </div>
          <div className="w-full flex items-center justify-between">
            <PriceDetail />
            <button className="bg-[#2563EB] py-2 px-4 flex justify-center items-center rounded-md text-[#FAFAFA]">Reserve</button>
          </div>
        </div>
      </div>
    </div>
  );
};
