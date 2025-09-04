import Image from 'next/image';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
export type Props = {
  id: string;
  image: string;
  foodName: string;
  price: string;
  count?: number;
  onAdd?: (_id: string, _image: string, _foodName: string, _price: string) => void;
  onRemove: (_id: string) => void;
  discount: any;
};

const MenuCard = ({ id, image, foodName, price, count = 0, onAdd, onRemove, discount }: Props) => {
  const [isDiscounted, setIsDiscounted] = useState<number | null>(null);
  useEffect(() => {
    if (discount?.discountRate != null) {
      console.log(new Date(parseInt(discount.endDate)), ' hello');
      const expired = new Date(parseInt(discount.endDate)).getTime() < Date.now();
      if (!expired) {
        setIsDiscounted(discount.discountRate);
      }
    }
  }, [discount]);

  function shortPrice(n: number) {
    if (n >= 1000) {
      return `${(n / 1000).toFixed(3).replace(/\.?0+$/, '')}k`;
    }
    return `${n}`;
  }
  return (
    <div className="flex relative h-fit w-full justify-center ">
      <div onClick={() => onAdd?.(id, image, foodName, price)} className="w-[165px] h-[200px] flex flex-col">
        <div className="relative w-full h-[160px] rounded-xl overflow-hidden">
          <Image src={image} alt="hool" fill className="object-cover" />

          {count > 0 && (
            <div className="flex relative w-[50%] h-full ml-[50%] justify-center items-center">
              <div className="flex absolute w-full h-full bg-black opacity-50  "></div>

              <p className="flex absolute text-[30px] text-white ">{count}</p>
            </div>
          )}
          {isDiscounted !== null && <div className="bg-red-600 text-white flex relative w-[38px] h-[28px] mt-[127px] items-center justify-center text-[12px]">{isDiscounted}%</div>}
        </div>
        <div className="flex flex-col mt-1">
          <p className="text-[14px] truncate">{foodName}</p>
          {isDiscounted !== null ? (
            <div className="flex gap-2">
              <p className="text-[18px] font-bold">{shortPrice(parseInt(price) - (parseInt(price) / 100) * isDiscounted)}</p>
              <p className="text-[18px] text-[#09090B]/30 line-through">{shortPrice(parseInt(price))}</p>
            </div>
          ) : (
            <p className="text-[18px] font-bold">{shortPrice(parseInt(price))}</p>
          )}
        </div>
      </div>
      {count > 0 && (
        <X
          onClick={() => {
            onRemove(id);
          }}
          className="flex absolute z-12 w-[18px] h-[18px] text-white cursor-pointer ml-[140px] mt-[10px]"
        />
      )}
    </div>
  );
};

export default MenuCard;
