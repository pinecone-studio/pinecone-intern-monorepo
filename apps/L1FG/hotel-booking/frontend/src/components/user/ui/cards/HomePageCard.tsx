import FlowerIcon from '../svg/FlowerIcon';
import ParkingCircleIcon from '../svg/ParkingCircleIcon';
import Image from 'next/image';
import WifiIcon from '../svg/WifiIcon';
import { Hotel } from '@/generated';
import { Star } from 'lucide-react';

export const HomePageCard = ({ data }: { data: Hotel }) => {
  const stars = data?.starRating ? [...Array(data?.starRating)] : [];
  return (
    <div className="card bg-base-100 w-full rounded-md border border-[#E4E4E7]">
      <div className="relative min-h-[216px] min-w-[308px]">
        <Image
          alt={data.name}
          src={data?.images[0] || 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/b0/b9/d0/cheap-hotels.jpg?w=1200&h=-1&s=1'}
          className="rounded-t-[6px] w-full h-full object-cover"
          layout="fill"
        />
      </div>
      <div className="flex flex-col gap-4 p-4">
        <div className="">
          <h2 className="card-title text-base leading-7 font-bold">{data?.name}</h2>
          <div className="flex gap-1">
            {stars?.map((_, index) => (
              <Star key={index} size={16} className="fill-[#F97316] text-[#F97316]" />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 ">
            <WifiIcon />
            <p className="text-sm font-Inter font-normal leading-5 text-[#09090B]">Free WiFi</p>
          </div>
          <div className="flex items-center gap-2">
            <FlowerIcon />
            <p className="text-sm font-Inter font-normal leading-5 text-[#09090B]">Spa access</p>
          </div>
          <div className="flex items-center gap-2">
            <ParkingCircleIcon />
            <p className="text-sm font-Inter font-normal leading-5 text-[#09090B]">Free self parking</p>
          </div>
          <div className="flex gap-2">
            <div className="flex justify-center items-center w-9 h-5 rounded-full bg-[#2563EB] text-xs font-Inter font-semibold leading-4 text-[#FAFAFA]">{data?.rating}</div>
            <p className="text-sm font-Inter font-semibold leading-5">Excellent</p>
          </div>
        </div>
      </div>
    </div>
  );
};
