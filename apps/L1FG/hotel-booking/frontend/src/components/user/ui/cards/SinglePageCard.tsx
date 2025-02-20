import WifiIcon from '../svg/WifiIcon';
import FlowerIcon from '../svg/FlowerIcon';
import ParkingCircleIcon from '../svg/ParkingCircleIcon';
import UtensilsIcon from '../svg/UtensilsIcon';
import DumbBellIcon from '../svg/DumbBellIcon';
import BusIcon from '../svg/BusIcon';
import DoorClosedIcon from '../svg/DoorClosedIcon';
import { Room } from '@/generated';
import { SinglePageCardImage } from './SinglePageCardImage';
import { SinglePageCardPrice } from './SinglePageCardPrice';
import { RoomInformationCard } from './RoomInformationCard';

interface SinglePageCardProps {
  rooms?: Room | null;
}

export const SinglePageCard = ({ rooms }: SinglePageCardProps) => {
  const priceRoom = rooms?.price || 0;
  return (
    <div data-testid="room-card" className="w-full text-foreground border rounded-[6px]">
      <SinglePageCardImage rooms={rooms} />
      <div className="p-4">
        <div className="flex flex-col gap-4">
          <div className="font-Inter text-base font-bold leading-7">{rooms?.name}</div>
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
              <RoomInformationCard rooms={rooms} />
            </button>
          </div>
        </div>
        <div className="py-4">
          <div className="border"></div>
        </div>
        <SinglePageCardPrice rooms={priceRoom} />
      </div>
    </div>
  );
};
