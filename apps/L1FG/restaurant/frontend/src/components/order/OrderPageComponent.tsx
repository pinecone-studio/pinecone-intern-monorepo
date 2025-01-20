'use client';
import { Button } from '@/components/ui/button';
import Header from '@/components/common/Header';
import { useGetCategoriesQuery, useGetFoodsQuery } from '@/generated';
import Image from 'next/image';
import React, { useState } from 'react';

const OrderPageComponent = () => {
  const { data: foodData } = useGetFoodsQuery();
  const { data: categoryData } = useGetCategoriesQuery();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const formatPrice = (price: number) => {
    if (price >= 1000) {
      return (price / 1000).toFixed(1) + 'к';
    }
    return price.toString();
  };

  const filteredFoods = selectedCategory === null ? foodData?.getFoods : foodData?.getFoods.filter((food) => food.categoryId === selectedCategory);

  return (
    <div className="max-w-full" data-testid="order-page">
      <Header />
      <div className="flex flex-col pt-6 px-4">
        <div className="text-[#441500] pb-4 text-center font-[600] text-[20px] font-gip leading-[32px]" data-testid="menu-title">
          Хоолны цэс
        </div>

        {/* Category Buttons */}
        <div className="flex max-w-full overflow-x-scroll pb-2" data-testid="category-buttons">
          <Button
            onClick={() => setSelectedCategory(null)}
            className={`text-[#441500] px-4 py-2 font-gip text-[14px] font-medium leading-[20px] ${selectedCategory === null ? 'bg-[#f0f0f0] font-bold' : ''}`}
            variant="ghost"
            data-testid="category-all"
          >
            Бүгд
          </Button>
          {categoryData?.getCategories.map((category: { categoryName: string; id: string }) => (
            <div key={category.id}>
              <Button
                onClick={() => setSelectedCategory(category.id)}
                className={`text-[#441500] px-4 py-2 font-gip text-[14px] font-medium leading-[20px] ${selectedCategory === category.id ? 'bg-[#f0f0f0] font-bold' : ''}`}
                variant="ghost"
                data-testid={`category-${category.id}`}
              >
                {category.categoryName}
              </Button>
            </div>
          ))}
        </div>

        {/* Food Items */}
        <div className="grid grid-cols-2 gap-4 w-full" data-testid="food-list">
          {filteredFoods?.map((food) => (
            <div className="flex food-item flex-col gap-1" key={food.id} data-testid={`food-item-${food.id}`}>
              <Image width={160} height={160} alt="food" className="w-[45vw] h-[45vw] object-cover rounded-md" src={food.imageUrl} />
              <div className="text-[#09090B] text-[14px] font-[300] leading-[20px] font-gip" data-testid={`food-name-${food.id}`}>
                {food.foodName}
              </div>
              <div className="text-[#09090B] text-[18px] font-[700] leading-[20px] font-gip" data-testid={`food-price-${food.id}`}>
                {formatPrice(food.price)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderPageComponent;
