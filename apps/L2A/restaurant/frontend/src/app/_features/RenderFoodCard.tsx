import Image from 'next/image';

type Food = {
  id: number;
  name: string;
  price: string;
  image: string;
};

type RenderFoodCardProps = {
  food: Food;
};

const RenderFood = ({ food }: RenderFoodCardProps) => {
  return (
    <div key={food.id} data-cy={'Foods'} className="flex flex-col ">
      <div className="h-[150px] w-[150px] bg-gray overflow-hidden bg-cover">
        <Image src={food.image} className="rounded-lg" width={160} height={160} alt={food.name} />
      </div>
      <div>{food.name}</div>
      <div className="font-bold text-[#09090B] text-[18px]">{food.price}k</div>
    </div>
  );
};

export default RenderFood;
