'use client';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import MenuCard from './MenuCard';
import { useGetCategoriesQuery, useGetFoodsQuery } from '@/generated';

const HomePageContainer = () => {
  const { data: foodsData, loading: foodsLoading } = useGetFoodsQuery();
  const { data: categoriesData, loading: categoriesLoading } = useGetCategoriesQuery();
  console.log(foodsData, 'food');
  console.log(categoriesData, 'catergories');
  const [activeCategory, setActiveCategory] = useState('Үндсэн хоол');
  const filteredItems = foodsData?.getFoods.filter((item) => item?.category.categoryName === activeCategory);
  console.log(filteredItems, '/////////');
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white px-4 py-6 text-center border-b">
        <h1 className="text-2xl font-bold text-gray-800">Хоолны цэс</h1>
      </div>
      <div className="bg-white px-4 py-4 border-b">
        <div className="flex space-x-6 overflow-x-auto">
          {categoriesData?.getCategories.map((category) => (
            <button
              data-testid="homepage-container-filter-button"
              key={category?.categoryId}
              onClick={() => {
                setActiveCategory(category.categoryName);
              }}
              className={`whitespace-nowrap text-sm font-medium pb-2 border-b-2 transition-colors ${
                activeCategory === category?.categoryName ? 'text-orange-600 border-orange-600' : 'text-gray-500 border-transparent hover:text-gray-700'
              }`}
            >
              {category?.categoryName}
            </button>
          ))}
        </div>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
          {filteredItems?.map((value) => (
            <MenuCard key={value?.foodId} image={value.image} foodName={value.foodName} price={value.price} id={value.foodId} category={value.category.categoryId} />
          ))}
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
        <Button className="w-full bg-amber-800 hover:bg-amber-900 text-white py-4 text-lg font-medium rounded-lg">Захиалах</Button>
      </div>
      <div className="h-20"></div>
    </div>
  );
};

export default HomePageContainer;
