import Image from 'next/image';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import HomeOrder from './HomeOrder';

export type Food = {
  id: number;
  name: string;
  price: string;
  image: string;
};

export type RenderFoodCardProps = {
  food: Food;
};

const RenderFood = ({ food }: RenderFoodCardProps) => {
  return (
    <div>
      <Drawer>
        <DrawerTrigger asChild>
          <button key={food.id} data-cy="Foods" className="flex flex-col">
            <div className="h-[150px] w-[150px] bg-gray overflow-hidden bg-cover">
              <Image src={food.image} className="rounded-lg" width={160} height={160} alt={food.name} />
            </div>
            <div>{food.name}</div>
            <div className="font-bold text-[#09090B] text-[18px]">{food.price}k</div>
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
