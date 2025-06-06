'use client';

import { useState } from 'react';
import RenderFood from './RenderFoodCard';
import { useGetProductsQuery } from '@/generated';
import dummyCategories from '../_components/categories.json';

const HomeMain = () => {
  const { data: backendData } = useGetProductsQuery();
  const [activeTab, setActiveTab] = useState<'backend' | 'drinks' | 'coffee'>('backend');

  const renderFoods = () => {
    if (activeTab === 'backend') {
      return backendData?.getProducts?.map((item: any) => (
        <RenderFood
          key={item._id}
          food={{
            id: item._id,
            name: item.name,
            price: item.price,
            images: item.images?.[0] || '/images.jpeg',
          }}
        />
      ));
    }

    const selectedDummy = dummyCategories.find((c) =>
      activeTab === 'drinks' ? c.name === 'Ундаа, ус' : c.name === 'Кофе, цай'
    );

    return selectedDummy?.foods?.map((food: any) => (
      <RenderFood
        key={food._id}
        food={{
          id: food._id,
          name: food.name,
          price: food.price,
          images: food.image,
        }}
      />
    ));
  };

  return (
    <div className="pt-10 w-full max-w-md mx-auto">
      <div className="text-center text-[#441500] text-lg font-extralight mb-5">Хоолны цэс</div>

      <div className="flex justify-center gap-2 mb-6">
        <button
          onClick={() => setActiveTab('backend')}
          className={`px-3 py-1 rounded text-sm ${activeTab === 'backend' ? 'bg-[#F4F4F5]' : 'bg-white'}`}
        >
          Үндсэн
        </button>
        <button
          onClick={() => setActiveTab('drinks')}
          className={`px-3 py-1 rounded text-sm ${activeTab === 'drinks' ? 'bg-[#F4F4F5]' : 'bg-white'}`}
        >
          Ундаа, ус
        </button>
        <button
          onClick={() => setActiveTab('coffee')}
          className={`px-3 py-1 rounded text-sm ${activeTab === 'coffee' ? 'bg-[#F4F4F5]' : 'bg-white'}`}
        >
          Кофе, цай
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 px-4">{renderFoods()}</div>
    </div>
  );
};

export default HomeMain;
