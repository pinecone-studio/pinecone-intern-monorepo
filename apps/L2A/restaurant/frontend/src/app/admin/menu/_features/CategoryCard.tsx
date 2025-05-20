"use client";

import { Button } from '@/components/ui/button';
import { Pencil, Trash } from 'lucide-react';

export type Food = {
  id: number;
  name: string;
};

export type FoodCardProps = {
  food: Food;
};

const CategoryCard: React.FC<FoodCardProps> = ({ food }) => {
  return (
    <div data-cy="category-card" className="w-[536px] flex flex-col border-b">
      <div key={food.id} className="flex items-center justify-between py-4" data-cy="category-card-inner">
        <p className="font-semibold" data-cy="food-name">
          {food.name}
        </p>
        <div data-cy="food-actions" className="flex gap-2">
          <Button variant="outline" size="icon" data-cy="edit-button">
            <Pencil className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon" data-cy="delete-button">
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
