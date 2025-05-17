import Image from 'next/image';
import { Star } from 'lucide-react';

const SearchCard = () => {
  return (
    <div className="flex" data-testid="searchcard-component">
      <Image src="https://placehold.co/395x222" width={395} height={222} className="bg-gray-200" alt="" />
      <div className="w-[477px] h-[222px] p-5 flex">
        <div className="h-[100%] flex flex-col justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-base font-bold leading-7">IBIS Styles Ulaanbaatar Polaris</h1>
            <div className="flex">
              <Star fill="orange" color="orange" size={16} />
              <Star fill="orange" color="orange" size={16} />
              <Star fill="orange" color="orange" size={16} />
              <Star fill="orange" color="orange" size={16} />
              <Star fill="orange" color="orange" size={16} />
            </div>
          </div>
          <div className="flex py-4 gap-2">
            <p className="bg-[#2563EB] rounded-full w-[39px] h-[20px] font-md text-sm flex items-center justify-center text-white px-[10px] py-[2px]">8.6</p>
            <p className="text-sm font-medium">Excellent</p>
          </div>
        </div>
        <div className="h-[100%] flex flex-col gap-1 w-[88px] justify-end">
          <div>
            <p className="text-sm font-normal leading-4 text-[#71717A]">Per night</p>
            <p className="text-lg font-normal leading-7 text-[#09090B]">150,000₮</p>
          </div>
          <div>
            <p className="text-xs font-normal leading-4 text-[#09090B]">210,000₮ total</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SearchCard;
