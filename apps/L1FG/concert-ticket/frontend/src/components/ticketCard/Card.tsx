import Image from 'next/image';
import { CalendarRange, MapPin } from 'lucide-react';
import { Concert } from '@/generated';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';

interface CardProps {
  card: Concert;
}
// eslint-disable-next-line complexity
export const Card = ({ card }: CardProps) => {


  const router = useRouter();
  const formatDate = format(new Date(card.concertDay), 'yyyy-M-d');

  const isValidUrl = (url: string | undefined): boolean => {
    if (!url) return false;
    try {
      new URL(url);
      return true;
    } catch {
      return url.startsWith('/');
    }
  };

  const displayArtists = Array.isArray(card.artistName) ? card.artistName.join(', ') : card.artistName;

  const imageSource = isValidUrl(card.concertPhoto) ? card.concertPhoto : '/default-image.jpg';

  return (

    <div
      onClick={() => router.push(`/detail/${card._id}`)}
      className="w-fit h-fit bg-stone-900 rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
      data-testid="card-container"
      data-cy="card-item"
    >
      <div className="relative w-[345px] h-[181px]">
        <Image
          alt={card.concertName || 'Concert Image'}
          fill
          src={imageSource as string}
          className="rounded-t-lg object-cover"
          priority
          sizes="(max-width: 345px) 100vw, 345px"
          data-testid="card-image"
        />
      </div>

      <div className="px-6 py-8 flex flex-col gap-6">
        <div className="flex flex-col text-white">
          <div className="text-muted-foreground text-xl" data-testid="card-concert-name">

            {card?.concertName}
          </div>
          <div className="text-muted-foreground font-extralight" data-testid="card-artist-name">
            {displayArtists}$
          </div>
        </div>
        <div className="flex items-center gap-4 text-white font-semibold text-2xl">
          <span data-testid="card-regular-price">${card?.regularTicket?.price || card?.standingAreaTicket?.price || 'N/A'}</span>
          {card?.regularTicket?.price !== card?.standingAreaTicket?.price && (
            <span className="text-muted-foreground text-lg font-extralight" data-testid="card-discount">
              ${card?.standingAreaTicket?.price || 'N/A'}
            </span>
          )}
        </div>

        <div className="flex flex-row justify-between">
          <div className="text-muted-foreground flex flex-row items-center">
            <CalendarRange className="w-5 h-5 mr-1" />
            <div data-testid="card-format-date">{formatDate}</div>
          </div>
          <div className="text-muted-foreground font-extralight flex flex-row items-center">

            <MapPin className="w-5 h-5 mr-1" />
            Төв цэнгэлдэх
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
