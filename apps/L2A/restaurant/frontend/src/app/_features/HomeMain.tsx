'use client';

import { useEffect, useState } from 'react';
import RenderFood from './RenderFoodCard';
import { useGetCategoriesQuery, useGetProductsQuery } from '@/generated';
/* eslint-disable complexity */
const HomeMain = () => {
  const { data, loading, error } = useGetCategoriesQuery();
  const { data: ordersData, loading: ordersLoading, error: ordersError } = useGetProductsQuery();

  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [orders, setOrders] = useState<any[]>([]);
  console.log('orders', orders);

  useEffect(() => {
    if (data?.getCategories) {
      setCategories(data.getCategories);
      if (!selectedCategoryId && data.getCategories.length > 0) {
        setSelectedCategoryId(data.getCategories[0]?._id !== undefined ? Number(data.getCategories[0]._id) : null);
      }
    }
  }, [data, selectedCategoryId]);

  useEffect(() => {
    if (ordersData?.getProducts) {
      setOrders(ordersData.getProducts);
    }
  }, [ordersData]);

  const selectedCategory = categories.find((cat) => cat.id === selectedCategoryId);

  if (loading || ordersLoading) return <div>Loading...</div>;
  if (error || ordersError) return <div>Алдаа гарлаа: {error?.message || ordersError?.message}</div>;

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

        <div className="text-[15px] text-gray-600 mb-3">Категори доторх хоолнууд:</div>
        <div data-cy="foodsdiv" className="items-center gap-5 grid grid-cols-2 mb-8">
          {selectedCategory?.foods.map((food: any) => (
            <RenderFood key={food.id} food={food} />
          ))}
        </div>

        <div className="text-[15px] text-gray-600 mb-3">Захиалсан хоолнууд:</div>
        <div data-cy="ordersdiv" className="items-center gap-5 grid grid-cols-2">
          {orders.map((order: any) => (
            <RenderFood key={order._id} food={order} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default HomeMain;
