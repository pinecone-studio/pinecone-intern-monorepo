"use client";

import Image from "next/image";

export type Food = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
};

type Props = {
  foods: Food[]; 
};

const OrderFoodCard = ({ foods }: Props) => {
  return (
    <div data-testid="order-food-card">
      {foods.map((food) => (
        <div
          key={food.id}
          className="rounded-md border flex h-[87px] w-[536px] mt-5 gap-4"
        >
          <div>
            <Image 
            data-testid="food-image"
              src={food.imageUrl}
              alt={food.name}
              width={86}
              height={86}
              className="h-[86px] rounded-md"
            />
          </div>
          <div className="flex flex-col justify-around">
            <h3 className="text-md font-semibold">{food.name}</h3>
            <p className="text-md font-medium text-gray-800">{food.price}₮</p>
            <p className="text-md font-medium text-gray-800">{food.quantity}ш</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderFoodCard;
