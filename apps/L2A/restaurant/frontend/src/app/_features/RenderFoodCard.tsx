import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import HomeOrder from './HomeOrder';
import Image from 'next/image';


export type Food = {
  id: number;
  name: string;
  price: string | number;
  images: string;
};

export type RenderFoodCardProps = {
  food: Food;
};

const RenderFood = ({ food }: RenderFoodCardProps) => {
  console.log(food);
  
    return (
    <div className="w-full max-w-[180px]">
      <Drawer>
        <DrawerTrigger asChild>
          <button data-cy="Foods" className="flex flex-col gap-1 items-start w-full">
            <div className="h-[160px] w-[160px] bg-gray-200 rounded-lg overflow-hidden relative">
              <Image src={food.images || food.images[0]} className="rounded-lg" width={180} height={180} alt={food.name} />
            </div>
            <div className="text-[#09090B] text-[14px] font-light truncate">{food.name}</div>
            <div className="text-[#09090B] text-[18px] font-bold">{food.price}k</div>
          </button>
        </DrawerTrigger>
        <DrawerContent>
          <HomeOrder />
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default RenderFood;
