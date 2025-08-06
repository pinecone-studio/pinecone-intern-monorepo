import Image from 'next/image';
import React, { useState } from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
export type CardProps = {
  id: number;
  image: string;
  foodName: string;
  price: string;
  category: string;
};
const MenuCard = ({ image, foodName, price, category }: CardProps) => {
  const [isSelected, setIsSelected] = useState(false);
  const [selectCount, setSelectCount] = useState(0);
  const handleSelect = (id: string) => {
    setIsSelected(true);
    setSelectCount(selectCount + 1);
  };
  return (
    <div
      onClick={() => {
        handleSelect(category);
      }}
      className="w-[165px] h-[204px] flex flex-col"
    >
      <div className="relative w-full h-[160px] rounded-xl overflow-hidden">
        <Image src={image} alt="hool" fill className="object-cover" />
        {isSelected && (
          <div className="flex relative w-[50%] h-full ml-[50%] justify-center items-center">
            <div className="flex absolute w-full h-full bg-black opacity-50  "></div>
            <p className="flex absolute text-[30px] text-white ">{selectCount}</p>
          </div>
        )}
      </div>
      <div className="flex flex-col mt-1">
        <p className="text-[14px] truncate">{foodName}</p>
        <p className="text-[18px] font-bold">{price}k</p>
      </div>
    </div>
  );
};

export default MenuCard;
