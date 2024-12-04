'use client';

import Image from 'next/image';
import { StarFillIcon } from '../../icon';
import { useRouter } from 'next/navigation';

type PopularHotelsCardProps = {
  id: string;
  name: string;
  image: string;
  stars: number;
  rating: number;
};
export const PopularHotelsCard = ({ id, name, image, stars, rating }: PopularHotelsCardProps) => {
  const router = useRouter();
  return (
    <div data-testid="hotels-card" onClick={() => router.push(`/hotels/${id}`)} className="border rounded-md overflow-hidden cursor-pointer">
      <div className="h-56 relative">
        <Image src={image} alt={name} fill />
      </div>
      <div className="p-3 space-y-4">
        <div>
          <h1 className="font-bold">{name}</h1>
          <div className="flex gap-1">
            {Array.from({ length: stars }).map((_, index) => (
              <StarFillIcon key={index} />
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <h1 className="text-sm">Free WiFi</h1>
          <h1 className="text-sm">Spa access</h1>
          <h1 className="text-sm">Free self parking</h1>
          <div className="flex gap-2 items-center">
            <div className="font-semibold bg-blue-600 rounded-full text-xs px-[10px] py-[2px] w-fit text-white">{rating}</div>
            <p>Excellent</p>
          </div>
        </div>
      </div>
    </div>
  );
};
