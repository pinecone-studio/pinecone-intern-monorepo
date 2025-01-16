import Image from 'next/image';
import { CalendarRange, MapPin } from 'lucide-react';

type DataProps = {
  src: string;
  title: string;
  artist: string;
  price: string;
  concertDay: string;
  discount: string;
};
type CardProps = {
  card: DataProps;
};
export const Card = ({ card }: CardProps) => {
  return (
    <div className="w-fit h-fit bg-stone-900 rounded-lg ">
      <Image alt="coldplay" width={345} src={card?.src} height={181} className="rounded-lg"></Image>
      <div className=" px-6 py-8 flex flex-col gap-6">
        <div className="flex flex-col text-white">
          <div className="text-muted-foreground text-xl">{card?.title}</div>
          <div className="text-muted-foreground font-extralight">{card?.artist}</div>
        </div>
        <div className="flex items-center gap-4 text-white font-semibold text-2xl">
          <a>{card?.price}$</a>
          <a className="text-muted-foreground text-lg font-extralight">{card?.discount}$</a>
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
