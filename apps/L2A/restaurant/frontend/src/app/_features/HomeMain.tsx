'use client';

import { useEffect, useState } from 'react';
import RenderFood from './RenderFoodCard';
import { useGetCategoriesQuery } from '@/generated';

const HomeMain = () => {
  const { data, loading, error } = useGetCategoriesQuery();
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  console.log('data', data);

  useEffect(() => {
    if (data?.getCategories) {
      setCategories(data.getCategories);
      if (!selectedCategoryId && data.getCategories.length > 0) {
        setSelectedCategoryId(data.getCategories[0]?._id !== undefined ? Number(data.getCategories[0]._id) : null);
      }
    }
  }, [data, selectedCategoryId]);

  const selectedCategory = categories.find((cat) => cat.id === selectedCategoryId);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Алдаа гарлаа: {error.message}</div>;

  return (
    <div data-cy="home-page">
      <main className="flex items-center flex-col w-full mx-auto pt-10">
        <div className="text-[#441500] text-[19px] font-extralight mb-5">Хоолны цэс</div>

        <div data-cy="food" className="flex gap-2 mb-4">
          {categories.map((categor) => (
            <button
              data-cy="category-buttons"
              key={categor.id}
              className={`px-3 py-1 rounded text-[13px] ${selectedCategoryId === categor.id ? 'bg-[#F4F4F5] text-black' : 'bg-white'}`}
              onClick={() => setSelectedCategoryId(categor.id)}
            >
              {categor.name}
            </button>
          ))}
        </div>

        <div data-cy="foodsdiv" className="items-center gap-5 grid grid-cols-2">
          {selectedCategory?.foods.map((food: any) => (
            <RenderFood key={food.id} food={food} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default HomeMain;
