import Image from 'next/image';
import { Star } from 'lucide-react';
import { Hotel } from '@/generated';
import { useNightsCount } from '@/features/user/main/useNightsCount';

export const HotelCard = ({ data }: { data: Hotel | null }) => {
  const stars = data?.starRating ? [...Array(data?.starRating)] : [];
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {}).format(price);
  };

  return (
    <div className="w-[872px] flex border border-[#E4E4E7] rounded-md">
      <div className="relative w-[395px] h-[222.20px]">
        <Image
          src={data?.images[0] || 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/b0/b9/d0/cheap-hotels.jpg?w=1200&h=-1&s=1'}
          alt="description"
          className="rounded-t-[6px] w-full h-full object-cover"
          layout="fill"
        />
      </div>
      <div className="w-[477px] p-5 flex">
        <div className="w-[349px] flex flex-col justify-between">
          <div className="flex flex-col gap-2">
            <p className="font-Inter text-[16px] leading-[28px] font-[700] text-start">{data?.name}</p>
            <div className="flex gap-1">
              {stars?.map((_, index) => (
                <Star key={index} size={16} className="fill-[#F97316] text-[#F97316]" />
              ))}
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <p className="w-[39px] h-[20px] text-center py-[2px] text-white bg-[#2563EB] rounded-full text-[12px] leading-[16px] font-600">{data?.rating}</p>
            <p className="text-[14px] leading-[20px] font-Inter font-[500]">Excellent</p>
          </div>
        </div>
        <div className="w-[88px] flex flex-col gap-1 justify-end">
          <p className="text-[12px] leading-[16px] font-Inter font-[400] text-[#71717A]">Per night</p>
          <p className="text-[20px] leading-[28px] font-Inter font-[500] text-[#09090B]">{formatPrice(10000)}₮</p>
          <p className="text-[12px] leading-[16px] font-Inter font-[400] text-[#09090B]">{formatPrice(10000 * useNightsCount())}₮ total</p>
        </div>
      </div>
    </div>
  );
};
