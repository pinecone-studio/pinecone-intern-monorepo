import Image from 'next/image';
import { CalendarRange, MapPin } from 'lucide-react';
import { Concert } from '@/generated';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';

interface CardProps {
  card: Concert;
}

export const Card = ({ card }: CardProps) => {
  const formatDate = format(new Date(card.concertDay), 'M-d');
  const router = useRouter();
  return (
    <div onClick={() => router.push(`/detail/${card._id}`)} className={`w-fit h-fit bg-zinc-900 rounded-md`} data-testid="card-container" data-cy="card-item">
      <Image alt="coldplay" width={414} src={'/coldplay.png'} height={230} className="rounded-md"></Image>
      <div className=" px-6 py-8 flex flex-col gap-6">
        <div className="flex flex-col gap-1 text-white">
          <div className="text-white text-2xl" data-testid="card-concert-name">
            {card?.concertName}
          </div>
          <div className="text-muted-foreground font-extralight" data-testid="card-artist-name">
            {card?.artistName}
          </div>
        </div>
        <div className="flex items-center gap-4 text-white font-semibold text-2xl">
          <a data-testid="card-regular-price">{card?.regularTicket?.price}$</a>
          <a className="text-muted-foreground text-lg font-extralight" data-testid="card-discount">
            {card?.regularTicket?.price}$
          </a>
        </div>
        <div className="flex flex-row justify-between ">
          <div className="text-neutral-400 flex flex-row">
            <CalendarRange className="w-5 h-5 mr-1" />
            <div data-testid="card-format-date">{formatDate}</div>
          </div>
          <div className="text-neutral-400 font-extralight flex flex-row ">
            <MapPin className="w-5 h-5 mr-1" />
            Төв цэнгэлдэх
          </div>
        </div>
      </div>
    </div>
  );
};
