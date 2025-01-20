'use client';
import { Button } from '@/components/ui/button';
import Header from '@/components/common/Header';
import { useGetCategoriesQuery, useGetFoodsQuery } from '@/generated';
import Image from 'next/image';
import React from 'react';

const OrderPageComponent = () => {
  const { data: foodData } = useGetFoodsQuery(); // Fetch food data with Apollo
  const { data: categoryData } = useGetCategoriesQuery(); // Fetch category data with Apollo

  // Function to format the price (convert to "k" format if needed)
  const formatPrice = (price: number) => {
    if (price >= 1000) {
      return (price / 1000).toFixed(1) + 'к'; // Convert price to "k" format
    }
    return price.toString(); // Return price as string if it's less than 1000
  };

  return (
    <div className="max-w-full">
      <Header />
      <div className="flex flex-col pt-6 px-4">
        <div className="text-[#441500] pb-4 text-center font-[600] text-[20px] font-gip leading-[32px]">Хоолны цэс</div>
        <div className="flex max-w-full overflow-x-scroll pb-2 ">
          {categoryData?.getCategories.map((category: { categoryName: string; id: string }) => (
            <div key={category.id}>
              <Button className="text-[#441500] px-4 py-2 font-gip text-[14px] font-medium leading-[20px]" variant="ghost">
                {category.categoryName}
              </Button>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4 w-full">
          {foodData?.getFoods?.map((food: { id: string; foodName: string; imageUrl: string; price: number }) => (
            <div className="flex food-item flex-col gap-1" key={food.id}>
              <Image width={160} height={160} alt="food" className="w-[45vw] h-[45vw] object-cover rounded-md" src={food.imageUrl} />
              <div className="text-[#09090B] text-[14px] font-[300] leading-[20px] font-gip">{food.foodName}</div>
              <div className="text-[#09090B] text-[18px] font-[700] leading-[20px] font-gip">{formatPrice(food.price)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderPageComponent;
