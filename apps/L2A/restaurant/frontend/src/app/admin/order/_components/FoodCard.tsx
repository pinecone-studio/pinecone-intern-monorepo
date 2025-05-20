"use client";

import Image from "next/image";

export type Food = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type FoodProps = {
  orders: Food[];
};

const FoodCard = ({ orders }: FoodProps) => {
  return (
    <div className="flex flex-col gap-4">
      {orders.map((item) => (
        <div
          key={item.id}
          className="flex w-[536px] gap-6"
          data-cy="food-item"
        >
          <div className="h-[86px] w-[86px] overflow-hidden rounded-lg text-bold">
            <Image
              src={item.image}
              width={86}
              height={86}
              alt={item.name}
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className="font-bold text-[#09090B]" data-cy="food-name">
              {item.name}
            </p>
            <p className="font-bold text-[#09090B]" data-cy="food-price">
              {item.price}₮
            </p>
            <p className="font-bold text-[#09090B]" data-cy="food-qty">
              {item.quantity}ш
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FoodCard;
