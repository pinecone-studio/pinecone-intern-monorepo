import Image from 'next/image';

export type Food = {
  id: number;
  name: string;
  price: string;
  image: string;
  status: string;
};
type FoodCardProps = {
  food: Food;
};

const FoodCard = ({ food }: FoodCardProps) => {
  return (
    <div className="flex flex-col gap-4 py-3 border-b">
      <div key={food.id} className="flex w-[536px] gap-6" data-cy="food-item">
        <div className="h-[86px] w-[86px] overflow-hidden rounded-lg text-bold">
          <Image src={food.image} width={86} height={86} alt={food.name} className="w-20 h-20 rounded-lg object-cover" />
        </div>
        <div className="flex flex-col justify-center">
          <p className="font-bold text-[#09090B]" data-cy="food-name">
            {food.name}
          </p>
          <p className="font-bold text-[#09090B]" data-cy="food-price">
            {food.price}k
          </p>
          <p className="flex justify-center text-sm border-2 rounded w-[80px] font-semibold" data-cy="food-status">
            {food.status}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;