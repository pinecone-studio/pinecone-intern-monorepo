import Image from 'next/image';
import { X } from 'lucide-react';
export type Props = {
  id: string;
  image: string;
  foodName: string;
  price: string;
  count?: number;
  onAdd?: (_id: string, _image: string, _foodName: string, _price: string) => void;
  onRemove: (_id: string) => void;
};

const MenuCard = ({ id, image, foodName, price, count = 0, onAdd, onRemove }: Props) => {
  function shortPrice(n: number) {
    if (n >= 1000) {
      return `${(n / 1000).toFixed(3).replace(/\.?0+$/, '')}k`;
    }
    return `${n}`;
  }
  return (
    <div className="flex relative">
      <div onClick={() => onAdd?.(id, image, foodName, price)} className="w-[165px] h-[204px] flex flex-col">
        <div className="relative w-full h-[160px] rounded-xl overflow-hidden">
          <Image src={image} alt="hool" fill className="object-cover" />
          {count > 0 && (
            <div className="flex relative w-[50%] h-full ml-[50%] justify-center items-center">
              <div className="flex absolute w-full h-full bg-black opacity-50  "></div>

              <p className="flex absolute text-[30px] text-white ">{count}</p>
            </div>
          )}
        </div>
        <div className="flex flex-col mt-1">
          <p className="text-[14px] truncate">{foodName}</p>
          <p className="text-[18px] font-bold">{shortPrice(parseInt(price))}</p>
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
