'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useGetCategoriesQuery, useGetFoodsQuery } from '@/generated';
import { Separator } from '@radix-ui/react-separator';
import Image from 'next/image';
import DeleteFoodDia from './DeleteFoodDia';
import AddFoodCateId from './adminmenupage/AddFoodCateId';

const AdminProductCard = () => {
  const { data: categories } = useGetCategoriesQuery();
  const { data: foods, refetch } = useGetFoodsQuery();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');

  useEffect(() => {
    if (categories?.getCategories.length) {
      setSelectedCategoryId(categories.getCategories[0].id);
    }
  }, [categories]);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
  };
  const formatPrice = (price: number) => {
    if (price >= 1000) {
      return (price / 1000).toFixed(1) + 'к';
    }
    return price.toString();
  };

  const filteredFoods = selectedCategoryId ? foods?.getFoods.filter((food) => food.categoryId === selectedCategoryId) : [];

  return (
    <Card className="flex flex-col p-8 gap-4">
      <CardTitle className="text-xl">Цэс</CardTitle>

      <div className="w-full border-b border-[#E4E4E7]">
        <div className="flex">
          {categories?.getCategories.map((cate) => (
            <Button
              variant="ghost"
              className={`
                  px-3 
                  py-2 
                  text-[14px] 
                  font-medium 
                  leading-[20px] 
                  text-[#09090B]
                  relative
                  group
                  transition-all
                  ${selectedCategoryId === cate.id ? 'font-bold' : ''}
                `}
              key={cate.id}
              onClick={() => handleCategoryClick(cate.id)}
            >
              {cate.categoryName}
              <span
                data-testid="nav-button-underline"
                className={`
                    absolute 
                    bottom-0 
                    left-0 
                    w-full 
                    h-[1px] 
                    bg-[#09090B]
                    transform
                    origin-left
                    transition-transform
                    duration-300
                    ${selectedCategoryId === cate.id ? 'scale-x-100' : 'scale-x-0'}
                    group-hover:scale-x-100
                  `}
              ></span>
            </Button>
          ))}
        </div>
      </div>
      <div>
        <div className="w-full flex justify-end">
          <AddFoodCateId refetch={refetch} categoryId={selectedCategoryId} />
        </div>
        <div className="mt-6">
          {filteredFoods?.length ?? 0 > 0 ? (
            filteredFoods?.map((food, index) => (
              <div key={food.id} className="flex flex-col gap-4">
                <div className="flex justify-between gap-4">
                  <Image src={food?.imageUrl} alt="food" width={87} height={87} className="h-[87px] object-cover rounded-md" />
                  <div className="w-[321px] flex flex-col gap-2">
                    <div className="text-[#09090B] text-[16px] leading-[20px] font-light">{food?.foodName}</div>
                    <div className="text-[#09090B] text-[18px] leading-[20px] font-bold">{formatPrice(food?.price)}</div>
                    <div className="text-[#09090B] w-max rounded-md px-[10px] border border-[#E4E4E7] font-semibold text-xs">{food?.status}</div>
                  </div>
                  <div className="flex gap-2">
                    <DeleteFoodDia refetch={refetch} foodId={food.id} />
                  </div>
                </div>
                {index !== filteredFoods.length - 1 && <Separator />}
              </div>
            ))
          ) : (
            <div className="text-gray-500 text-sm">Энэ цэсэнд хоол алга.</div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default AdminProductCard;
