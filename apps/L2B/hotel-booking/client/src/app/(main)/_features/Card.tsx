import Image from 'next/image';
import { Star } from 'lucide-react';

type CardProps = {
  imageUrl?: string | null;
  name?: string | null;
  starRating?: number | null;
  amenities?: (string | null)[] | null;
  rating?: number | null;
  reviewText?: string;
};

export const Card = ({ imageUrl, name, starRating, amenities, rating }: CardProps) => {
  const activeStars = starRating || 0;
  return (
    <div data-testid="card-component" className="border-2 max-w-[280px] w-[100%] md:w-[260px] sm:w-[220px] overflow-hidden h-[360px] m-auto rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <Image width={500} height={500} className="bg-gray-200 h-[160px]" src={imageUrl || ''} alt={name || ''} />
      <div className="p-4">
        <h1 className="font-bold text-base">{name}</h1>
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={16} color="orange" fill={i < activeStars ? 'orange' : 'none'} />
          ))}
        </div>
        <div className="flex font-[intern] text-sm font-normal gap-3 mt-2 flex-col">
          {amenities?.slice(0, 3).map((card, index) => (
            <p className="flex gap-2" key={index}>
              {card}
            </p>
          ))}
        </div>
        <div className="flex py-4 gap-2">
          <p className="bg-[#2563EB] rounded-full w-[39px] h-[20px] font-md text-sm flex items-center justify-center text-white ">{rating}</p>
          <p className="text-sm font-medium">Excellent</p>
        </div>
      </div>
    </div>
  );
};
