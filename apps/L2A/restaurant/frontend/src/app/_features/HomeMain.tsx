'use client';

import { useState } from 'react';
import categories from '../_components/categories.json';
import RenderFood from './RenderFoodCard';

const HomeMain = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(categories[0].id);
  const selectedCategory = categories.find((cat) => cat.id === selectedCategoryId);

  return (
    <div data-cy="home-page">
      <main className="flex items-center flex-col w-[95%] mx-auto pt-10 ml-[30px]">
        <div className="text-[#441500] text-[19px] font-extralight mb-5">Хоолны цэс</div>

        <div data-cy="food" className="flex gap-2 mb-4">
          {categories.map((categor) => (
            <button
              data-cy="category-buttons"
              key={categor.id}
              className={`px-3 py-1 rounded ${selectedCategoryId === categor.id ? 'bg-[#F4F4F5] text-black' : 'bg-white'}`}
              onClick={() => setSelectedCategoryId(categor.id)}
            >
              {categor.name}
            </button>
          ))}
        </div>

        <div data-cy="foodsdiv" className="flex flex-wrap justify-around gap-10 grid grid-cols-2">
          {selectedCategory?.foods.map((food) => (
            <RenderFood key={food.id} food={food} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default HomeMain;
