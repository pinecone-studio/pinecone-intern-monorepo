'use client';

import { Button } from '@/components/ui/button';
import Header from '@/components/common/Header';
import { useGetCategoriesQuery, useGetFoodsQuery } from '@/generated';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import OrderList from './OrderList';
import { useCart } from '../providers/LocalProvider';

interface OrderPageComponentProps {
  tableNumber: number;
}

const OrderPageComponent: React.FC<OrderPageComponentProps> = ({ tableNumber }) => {
  const { data: foodData } = useGetFoodsQuery();
  const { data: categoryData } = useGetCategoriesQuery();
  const {
    addToCart,
    // orders,
    setTableId,
  } = useCart();
  // const [orderItems, setOrderItems] = useState(orders);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    setTableId(tableNumber);
  }, [setTableId, tableNumber]);

  const formatPrice = (price: number) => (price >= 1000 ? `${(price / 1000).toFixed(1)}к` : price.toString());

  const filteredFoods = selectedCategory === null ? foodData?.getFoods : foodData?.getFoods.filter((food) => food.categoryId === selectedCategory);

  return (
    <div className="container">
      <Header />
      <div className="flex flex-col px-4 pb-24 pt-20">
        <div className="text-[#441500] pb-4 text-center font-[600] text-[20px] font-gip leading-[32px]">Хоолны цэс</div>

        <div className="flex max-w-full overflow-x-scroll pb-2">
          <Button
            onClick={() => setSelectedCategory(null)}
            className={`text-[#441500] px-4 py-2 font-gip text-[14px] font-medium leading-[20px] ${selectedCategory === null ? 'bg-[#f0f0f0]' : ''}`}
            variant="ghost"
          >
            Бүгд
          </Button>
          {categoryData?.getCategories.map((category) => (
            <Button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`text-[#441500] px-4 py-2 font-gip text-[14px] font-medium leading-[20px] ${selectedCategory === category.id ? 'bg-[#f0f0f0]' : ''}`}
              variant="ghost"
            >
              {category.categoryName}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-4 gap-4 w-ful max-md:grid-cols-2 max-lg:grid-cols-3">
          {filteredFoods?.map((food) => {
            return (
              <div
                key={food.id}
                className="flex food-item relative flex-col gap-1 rounded-md w-full"
                onClick={() => addToCart({ ...food, _id: food.id, quantity: 1 })}
                data-testid={`food-item-${food.id}`}
                role="button"
              >
                <Image width={160} height={160} alt="food" className="w-full h-40 object-cover rounded-md" src={food.imageUrl} />
                <div className="text-[#09090B] font-light text-sm">{food.foodName}</div>
                <div className="text-[#09090B] text-lg font-bold cursor-pointer">{formatPrice(food.price)}</div>
                {/* {orderItems.some((order) => order._id === food.id) && (
                  <div className="absolute w-1/2 h-[74%] right-0 bg-[#0000007b] flex justify-center items-center rounded-r-md">
                    <span className="text-lg font-semibold text-white">{orderItems.find((order) => order._id === food.id)?.quantity}</span>
                  </div>
                )} */}
              </div>
            );
          })}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 container mx-auto">
        <OrderList />
      </div>
    </div>
  );
};

export default OrderPageComponent;
