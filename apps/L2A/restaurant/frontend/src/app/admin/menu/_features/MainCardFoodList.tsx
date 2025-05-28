import Image from 'next/image';
import DeleteUpdateDialog from './DeleteUpdateDialog';

export type Food = {
  id: number;
  name: string;
  price: string;
  image: string;
  status: string;
};
export type FoodCardProps = {
  food: Food;
};

const MainCardFoodList = ({ food }: FoodCardProps) => {
  return (
    <div className="w-[536px] flex flex-col">
      <div key={food.id} className="flex items-center py-4 border-b">
        <Image width={87} height={87} src={food.image} alt={food.name} className="w-20 h-20 rounded-lg object-cover" />
        <div className="flex-1 ml-4">
          <p className="font-semibold">{food.name}</p>
          <p className="font-bold">{food.price}k</p>
          <p className="text-sm font-bold border px-1 w-[80px] rounded text-center">{food.status}</p>
        </div>
        <DeleteUpdateDialog />
      </div>
    </div>
  );
};

export default MainCardFoodList;