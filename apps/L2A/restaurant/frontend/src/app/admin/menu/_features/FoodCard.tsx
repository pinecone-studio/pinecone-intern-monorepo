import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Pencil, Trash } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

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

const FoodCard: React.FC<FoodCardProps> = ({ food }) => {
  return (
    <div data-cy="food-card" className="w-[536px] flex flex-col mt-4">
      <Card key={food.id} className="flex items-center p-4">
        <Image
          width={87}
          height={87}
          src={food.image}
          alt={food.name}
          className="w-20 h-20 rounded-lg object-cover"
          data-cy="food-image"
        />
        <CardContent className="flex-1 ml-4 p-0">
          <p className="font-semibold" data-cy="food-name">
            {food.name}
          </p>
          <p className="font-bold" data-cy="food-price">
            {food.price}k
          </p>
          <p className="text-sm font-bold text-gray-500" data-cy="food-status">
            {food.status}
          </p>
        </CardContent>
        <div className="flex items-center" data-cy="food-actions">
          <Button variant="outline" size="icon" data-cy="edit-button">
            <Pencil className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon" data-cy="delete-button">
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default FoodCard;
