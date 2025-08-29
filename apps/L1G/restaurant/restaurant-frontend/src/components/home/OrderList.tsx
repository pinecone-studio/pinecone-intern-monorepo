'use client';
import Image from 'next/image';
import { Trash } from 'lucide-react';
type Props = {
  id: string;
  image: string;
  foodName: string;
  price: string;
  count: number;
  onAdd?: (_id: string, _image: string, _foodName: string, _price: string) => void;
  onRemove?: (_id: string, _image: string, _foodName: string, _price: string) => void;
  removeItem: (_id: string) => void;
};
const OrderList = ({ image, foodName, price, count, onAdd, onRemove, id, removeItem }: Props) => {
  return (
    <div className="flex w-full h-fit px-2 py-2 gap-4">
      <Image alt={foodName} src={image} width={90} height={90} className="rounded-xl object-cover" />
      <div className="flex flex-col justify-between flex-1 min-w-0">
        <div className="flex flex-col min-w-0">
          <p className="text-[14px] truncate" title={foodName}>
            {foodName}
          </p>
          <p className="text-[16px] font-semibold">Нэгж: {price}₮</p>
        </div>
        <div className="flex gap-3 items-center">
          <button
            onClick={() => {
              onAdd?.(id, image, foodName, price);
            }}
            className="w-10 h-10 rounded-xl border border-zinc-200 flex justify-center items-center text-lg"
            aria-label="Нэмэх"
          >
            +
          </button>
          <p className="w-6 text-center" aria-live="polite">
            {count}
          </p>
          <button
            onClick={() => {
              onRemove?.(id, image, foodName, price);
            }}
            className="w-10 h-10 rounded-xl border border-zinc-200 flex justify-center items-center text-lg disabled:opacity-40"
            disabled={count <= 1}
            aria-label="Хасах"
          >
            -
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center justify-between">
        <button
          onClick={() => {
            removeItem(id);
          }}
          aria-label="Устгах"
          className="w-10 h-10 rounded-md bg-zinc-100 flex justify-center items-center"
        >
          <Trash className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default OrderList;
