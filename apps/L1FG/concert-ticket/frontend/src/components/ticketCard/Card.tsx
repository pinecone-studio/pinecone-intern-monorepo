import Image from 'next/image';
import { CalendarRange, MapPin } from 'lucide-react';
import { Concert } from '@/generated';

interface CardProps {
  card: Concert;
}

export const Card = ({ card }: CardProps) => {
  return (
    <div className="w-fit h-fit bg-stone-900 rounded-lg ">
      <Image alt="coldplay" width={345} src={'/coldplay.png'} height={181} className="rounded-lg"></Image>
      <div className=" px-6 py-8 flex flex-col gap-6">
        <div className="flex flex-col text-white">
          <div className="text-muted-foreground text-xl">{card?.concertName}</div>
          <div className="text-muted-foreground font-extralight">{card?.artistName}</div>
        </div>
        <div className="flex items-center gap-4 text-white font-semibold text-2xl">
          <a>{card?.regularTicket?.price}$</a>
          <a className="text-muted-foreground text-lg font-extralight">{card?.regularTicket?.price}$</a>
        </div>
        <div className="flex flex-row justify-between ">
          <div className="text-muted-foreground flex flex-row">
            <CalendarRange className="w-5 h-5 mr-1" />
            {card?.concertDay}
          </div>
          <div className="text-muted-foreground font-extralight flex flex-row ">
            <MapPin className="w-5 h-5 mr-1" />
            UG ARENA
          </div>
        </div>
      </div>
    </div>
  );
};
