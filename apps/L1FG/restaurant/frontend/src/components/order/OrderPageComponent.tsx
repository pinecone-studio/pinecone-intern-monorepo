'use client';

import { Button } from '@/components/ui/button';
import Header from '@/components/common/Header';
import { useGetCategoriesQuery, useGetFoodsQuery } from '@/generated';
import Image from 'next/image';
import React, { useState } from 'react';
import OrderList from './OrderList';
import { X } from 'lucide-react';

interface FoodItem {
  id: string;
  foodName: string;
  imageUrl: string;
  price: number;
  categoryId: string;
  quantity: number;
}

interface OrderPageComponentProps {
  tableNumber: number;
}

const OrderPageComponent: React.FC<OrderPageComponentProps> = ({ tableNumber }) => {
  const { data: foodData } = useGetFoodsQuery();
  const { data: categoryData } = useGetCategoriesQuery();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<FoodItem[]>([]);

  const updateItemQuantity = (id: string, quantity: number) => {
    setSelectedItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, quantity } : item)));
  };

  const removeItem = (id: string) => {
    setSelectedItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const formatPrice = (price: number) => {
    if (price >= 1000) {
      return (price / 1000).toFixed(1) + 'к';
    }
    return price.toString();
  };

  const toggleSelection = (food: FoodItem): void => {
    setSelectedItems((prev) => (prev.some((item) => item.id === food.id) ? prev.filter((item) => item.id !== food.id) : [...prev, food]));
  };

  // Filter foods by selected category
  const filteredFoods = selectedCategory === null ? foodData?.getFoods : foodData?.getFoods.filter((food) => food.categoryId === selectedCategory);

  return (
    <div className="max-w-full" data-testid="order-page">
      <Header />
      <div className="flex flex-col px-4 pb-24 pt-20">
        <div className="text-[#441500] pb-4 text-center font-[600] text-[20px] font-gip leading-[32px]" data-testid="menu-title">
          Хоолны цэс
        </div>

        {/* Category Buttons */}
        <div className="flex max-w-full overflow-x-scroll pb-2" data-testid="category-buttons">
          <Button
            onClick={() => setSelectedCategory(null)}
            className={`text-[#441500] px-4 py-2 font-gip text-[14px] font-medium leading-[20px] ${selectedCategory === null ? 'bg-[#f0f0f0]' : ''}`}
            variant="ghost"
            data-testid="category-all"
          >
            Бүгд
          </Button>
          {categoryData?.getCategories.map((category: { categoryName: string; id: string }) => (
            <div key={category.id}>
              <Button
                onClick={() => setSelectedCategory(category.id)}
                className={`text-[#441500] px-4 py-2 font-gip text-[14px] font-medium leading-[20px] ${selectedCategory === category.id ? 'bg-[#f0f0f0]' : ''}`}
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
            <div
              className={`flex food-item relative flex-col gap-1 ${selectedItems.some((item) => item.id === food.id) ? '' : ''}`}
              key={food.id}
              data-testid={`food-item-${food.id}`}
              onClick={() => toggleSelection({ ...food, categoryId: food.categoryId ?? '', quantity: 1 })}
            >
              <Image width={160} height={160} alt="food" className={`w-[45vw] h-[45vw] object-cover ${selectedItems.some((item) => item.id === food.id) ? '' : ''} rounded-md`} src={food.imageUrl} />
              {selectedItems.some((item) => item.id === food.id) ? (
                <div className="absolute left-[49.3%] w-[22.5vw] rounded-tr-md rounded-br-md h-[45vw] flex-col items-start bg-[rgba(24,24,27,0.5)]">
                  <div className="w-full flex justify-end p-1">
                    <X color="#F4F4F5" width={16} height={16} />
                  </div>
                  <div className="text-white font-gip text-[28px] font-semibold leading-[20px] flex justify-center pt-[15vw]">1</div>
                </div>
              ) : null}
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
      <div className="fixed bottom-0 left-0 right-0 container mx-auto" data-testid="order-list">
        <OrderList tableNumber={tableNumber} selectedItems={selectedItems} updateItemQuantity={updateItemQuantity} removeItem={removeItem} />
      </div>
    </div>
  );
};

export default OrderPageComponent;
