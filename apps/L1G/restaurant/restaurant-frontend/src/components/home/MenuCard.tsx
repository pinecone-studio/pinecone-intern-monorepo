import Image from 'next/image';
import React from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
export type CardProps = {
  id: number;
  image: string;
  foodName: string;
  price: string;
  category: string;
};
const MenuCard = ({ image, foodName, price, category }: CardProps) => {
  return (
    <div className="w-[165px] h-[204px] flex flex-col">
      <div className="relative w-full h-[160px] rounded-xl overflow-hidden">
        <Image src={image} alt="hool" fill className="object-cover" />
      </div>
      <div className="flex flex-col mt-1">
        <p className="text-[14px] truncate">{foodName}</p>
        <p className="text-[18px] font-bold">{price}k</p>
      </div>
    </div>
  );
};

export default MenuCard;
