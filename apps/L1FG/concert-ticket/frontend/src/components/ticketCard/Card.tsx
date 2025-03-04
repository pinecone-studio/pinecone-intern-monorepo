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
  console.log(card.artistName);

  return (
    <div onClick={() => router.push(`/detail/${card._id}`)} className="w-fit h-fit bg-zinc-900 rounded-md cursor-pointer" data-testid="card-container" data-cy="card-item">
      <Image alt={card.concertName} width={414} src={card.concertPhoto.startsWith('http') ? card.concertPhoto : `/${card.concertPhoto}`} height={230} className="rounded-t-md w-[414px] h-[230px]" />{' '}
      <div className="px-6 py-8 flex flex-col gap-6">
        <div className="flex flex-col gap-1 text-white">
          <div className="text-white text-2xl" data-testid="card-concert-name">
            {card?.concertName}
          </div>
          <div className="text-muted-foreground font-extralight flex gap-[5px]" data-testid="card-artist-name">
            {card?.artistName.map((artist, index) => (
              <div key={index}>{artist}</div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4 text-white font-semibold text-2xl">
          <a data-testid="card-regular-price">{card?.regularTicket?.price}₮</a>
          <a className="text-muted-foreground text-lg font-extralight" data-testid="card-discount">
            {card?.regularTicket?.price}₮
          </a>
        </div>
        <div className="flex flex-row justify-between">
          <div className="text-neutral-400 flex flex-row">
            <CalendarRange className="w-5 h-5 mr-1" /> <div data-testid="card-format-date">{formatDate}</div>
          </div>
          <div className="text-neutral-400 font-extralight flex flex-row">
            <MapPin className="w-5 h-5 mr-1" /> Төв цэнгэлдэх
          </div>
        </div>
      </div>
    </div>
  );
};
