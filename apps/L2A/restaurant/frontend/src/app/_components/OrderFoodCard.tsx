"use client";

import Image from "next/image";

type FoodCardProps = {
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
};

const FoodCard = ({ name, price, imageUrl, quantity }: FoodCardProps) => {
  return (
    <div className="rounded-xl border shadow-md overflow-hidden w-[220px]">
      <Image src={imageUrl} alt={name} width={220} height={150} className="object-cover h-[150px]" />
      <div className="p-3">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-muted-foreground">{price.toLocaleString()}₮</p>
        <p className="text-sm text-muted-foreground">{quantity}ш</p>
      </div>
    </div>
  );
};

const mockFoods = [
  {
    id: 1,
    name: "Үхрийн мах",
    price: 12900,
    quantity: 12,
    imageUrl: "/images/beef-stirfry.jpg",
  },
  {
    id: 2,
    name: "Гоймон",
    price: 8900,
    quantity: 20,
    imageUrl: "/images/noodles.jpg",
  },
];

const OrderFoodCardList = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {mockFoods.map((food) => (
        <FoodCard
          key={food.id}
          name={food.name}
          price={food.price}
          quantity={food.quantity}
          imageUrl={food.imageUrl}
        />
      ))}
    </div>
  );
};
export default OrderFoodCardList;
