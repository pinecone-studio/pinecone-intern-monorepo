'use client';

import React from 'react';
import { useDeleteFoodMutation, useGetFoodsQuery } from '@/generated';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { Trash } from 'lucide-react';
import AdminFoodDialog from './AdminFoodDialog';
import AdminFoodUpdateDialog from './AdminFoodUpdateDialog';

const AdminFoodPageComp = () => {
  const { data: foodData, refetch } = useGetFoodsQuery();
  const [deleteFoodMutation] = useDeleteFoodMutation();

  const handleDeleteFood = async (foodId: string) => {
    const isConfirmed = window.confirm('Та энэ хоолыг устгахдаа итгэлтэй байна уу?');
    if (!isConfirmed) return;

    try {
      await deleteFoodMutation({
        variables: { foodId },
      });

      await refetch();
    } catch (error) {
      console.error('Failed to delete food:', error);
    }
  };

  const formatPrice = (price: number) => {
    if (price >= 1000) {
      return (price / 1000).toFixed(1) + 'к';
    }
    return price.toString();
  };

  return (
    <div className="flex flex-col items-center bg-[#F4F4F5] w-[100vw] min-h-[91.4vh] gap-4 py-14">
      <div className="flex w-[600px] justify-between mb-5">
        <div className="text-black font-poppins text-3xl font-semibold">Хоол</div>
        <AdminFoodDialog refetch={refetch} />
      </div>
      <div className="flex flex-col gap-4 w-[600px] bg-white rounded-lg border border-[#E4E4E7] p-8">
        {foodData?.getFoods?.map((food, index) => (
          <div className="flex flex-col gap-4" key={food?.id}>
            <div className="flex justify-between gap-4">
              <Image src={food?.imageUrl} alt="food" width={87} height={87} className="h-[87px] object-cover rounded-md" />
              <div className="w-[321px] flex flex-col gap-2">
                <div className="text-[#09090B] text-[16px] leading-[20px] font-light">{food?.foodName}</div>
                <div className="text-[#09090B] text-[18px] leading-[20px] font-bold">{formatPrice(food?.price)}</div>
                <div className="text-[#09090B] w-max rounded-md px-[10px] border border-[#E4E4E7] font-semibold text-xs">{food?.status}</div>
              </div>
              <div className="flex gap-2">
                <AdminFoodUpdateDialog
                  food={{
                    foodId: food.id,
                    foodName: food.foodName,
                    price: food.price.toString(),
                    status: food.status as 'Идэвхитэй' | 'Идэвхигүй',
                    imageUrl: food.imageUrl,
                  }}
                />

                <div onClick={() => handleDeleteFood(food?.id)} className="h-max p-2 bg-[#F4F4F5] rounded-md cursor-pointer" data-testid="delete-button">
                  <Trash width={16} height={16} />
                </div>
              </div>
            </div>
            {index !== foodData.getFoods.length - 1 && <Separator />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminFoodPageComp;
