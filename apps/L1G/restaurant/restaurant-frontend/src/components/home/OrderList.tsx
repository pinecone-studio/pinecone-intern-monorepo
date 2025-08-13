import Image from 'next/image';
import React from 'react';
import { Trash } from 'lucide-react';
export type orderListProps = {
  image: string;
  foodName: string;
  price: string;
  count: number;
};

const OrderList = ({ image, foodName, price, count }: orderListProps) => {
  return (
    <div className="flex w-full h-[87px] px-2 py-2 gap-4">
      <Image alt="food" src={image} width={100} height={100} className="rounded-xl" />
      <div className="flex flex-col justify-between">
        <div className="flex flex-col">
          <p className="text-[14px] truncate">{foodName}</p>
          <p className="text-[18px] font-bold">{price}k</p>
        </div>
        <div className="flex gap-4 justify-center items-center">
          <div className="w-[40px] h-[40px] rounded-xl border-[#E4E4E7] border-[1px] flex justify-center items-center">+</div>
          <p>{count}</p>
          <div className="w-[40px] h-[40px] rounded-xl border-[#E4E4E7] border-[1px] flex justify-center items-center">-</div>
        </div>
      </div>
      <div className="w-[40px] h-[40px] rounded-md bg-[#F4F4F5] flex justify-center items-center">
        <Trash />
      </div>
    </div>
  );
};

export default OrderList;
