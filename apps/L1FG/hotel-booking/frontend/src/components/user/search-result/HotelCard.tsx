import Image from 'next/image';
import { Star } from '../svg/Star';

export const HotelCard = () => {
  return (
    <div className="w-[872px] flex border border-[#E4E4E7]">
      <Image width={395} height={222.19} src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/b0/b9/d0/cheap-hotels.jpg?w=1200&h=-1&s=1" alt="description" />
      <div className="w-[477px] p-5 flex">
        <div className="w-[349px] flex flex-col justify-between">
          <div className="flex flex-col gap-2">
            <p className="text-[16px] leading-[28px] font-[700]">Toyoko Inn Ulaanbaatar</p>
            <div className="flex gap-1">
              <Star />
              <Star />
              <Star />
              <Star />
              <Star />
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <p className="w-[39px] h-[20px] text-center py-[2px] text-white bg-[#2563EB] rounded-full text-[12px] leading-[16px] font-600">8.6</p>
            <p className="text-[14px] leading-[20px] font-[500]">Excellent</p>
          </div>
        </div>
        <div className="w-[88px] flex flex-col gap-1 justify-end">
          <p className="text-[12px] leading-[16px] font-[400] text-[#71717A]">Per night</p>
          <p className="text-[20px] leading-[28px] font-[500] text-[#09090B]">150,000T</p>
          <p className="text-[12px] leading-[16px] font-[400] text-[#09090B]">210,000T total</p>
        </div>
      </div>
    </div>
  );
};
