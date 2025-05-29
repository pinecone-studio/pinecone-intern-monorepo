'use client';

import { MapPin, Ruler, BedSingle, Bath } from 'lucide-react';
import Image from 'next/image';

type ListingCardProps = {
  image: string | undefined | null; 
  price?: number | null | undefined;
  title: string | null | undefined;
  totalRooms: number | null | undefined
  restrooms: number | null | undefined;
  size: number | null | undefined
  city:string | null | undefined;
  district:string | null | undefined;
  imageCount?: string | null |undefined;
};


const ListingCard = ({ image, price, restrooms, totalRooms, size, city,district,title }: ListingCardProps) => {

  return (
    <div className="w-full max-w-sm bg-white rounded-xl shadow-md overflow-hidden transition-all duration-500 ease-in-out hover:scale-[1.05] hover:shadow-xl hover:translate-y-[-2px]">
      <div className="relative w-full h-48">
        <Image width={200} height={200} src={image || '/placeholder.png'} alt="no image"  className="object-cover h-[200px] w-full" />
      </div>

      <div className="p-4  space-y-2">
        <p className="text-lg font-semibold text-gray-900">{price?.toLocaleString()}₮</p>

        <div className="flex gap-2 items-start">
          <MapPin size={16} className="text-gray-500 mt-1" />
          <p className="text-sm text-gray-600">{title}</p>
        </div>

        <div className="flex items-center text-sm text-gray-600 gap-4">
          <div className="flex items-center gap-1">
            <Ruler size={16} className="text-gray-500" />
            <span>{size} м²</span>
          </div>
          <div className="flex items-center gap-1">
            <BedSingle size={16} className="text-gray-500" />
            <span>{totalRooms} өрөө</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath size={16} className="text-gray-500" />
            <span>{restrooms} а.ц.ө</span>
          </div>
        </div>
        <p className="text-xs text-gray-400 line-clamp-2">
  {[city, district].filter(Boolean).join(', ')}
</p>
      </div>
    </div>
  );
};

export default ListingCard;
