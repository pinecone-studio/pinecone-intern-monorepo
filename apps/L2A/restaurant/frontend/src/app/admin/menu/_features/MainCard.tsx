'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import menuCategories from '../_components/menu.json';
import MainCardFoodList from './MainCardFoodList';

const MainCard = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(menuCategories[0].id);
  const selectedCategory = menuCategories.find((category) => category.id === selectedCategoryId);
  return (
    <div>
      <Card className="flex flex-col justify-center w-[600px] px-10 pt-8 pb-5 mt-4 mb-10">
        <p className="font-semibold text-3xl">Цэс</p>
        <CardContent>
          <div data-cy="home-page">
            <div className="flex items-center flex-col pt-3">
              <div data-cy="food" className="flex gap-2 mb-4 w-[536px] border-b">
                {menuCategories.map((category, i) => (
                  <div
                    data-cy="category-buttons"
                    data-testid={`category-button-${i}`}
                    key={category.id}
                    className="flex items-center justify-center px-3 py-2 text-[14px] hover:border-b-2 hover:border-black"
                    onClick={() => setSelectedCategoryId(category.id)}
                  >
                    {category.name}
                  </div>
                ))}
              </div>
              <div data-cy="foodsdiv" className="items-center gap-5">
                {selectedCategory?.foods.map((food) => (
                  <MainCardFoodList key={food.id} food={food} />
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MainCard;