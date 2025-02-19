'use client';

import React from 'react';
import { Card, CardTitle } from '@/components/ui/card';
import { useGetCategoriesQuery } from '@/generated';
import { Separator } from '@/components/ui/separator';
import MenuAdd from './adminmenupage/MenuAdd';
import DeleteCateDia from './adminmenupage/DeleteCateDia';
import CateUpdateDia from './adminmenupage/UpdateCateDia';
const AdminControlCard = () => {
  const { data: categories, refetch } = useGetCategoriesQuery();

  return (
    <Card className="flex flex-col p-8 gap-4">
      <div className="w-full flex justify-between">
        <CardTitle className="text-xl text-black ">Цэс</CardTitle>
        <MenuAdd refetch={refetch} />
      </div>
      <div className="flex flex-col gap-4 mt-6">
        {categories?.getCategories.map((category, index) => (
          <div key={category.id} className="flex flex-col">
            <div className="w-full flex justify-between mb-4 items-center">
              <div className="font-normal text-base text-[#09090B]"> {category.categoryName}</div>
              <div className="flex gap-2">
                <CateUpdateDia cateId={category.id} refetch={refetch} />
                <DeleteCateDia cateId={category.id} refetch={refetch} />
              </div>
            </div>
            {index !== categories.getCategories.length - 1 && <Separator />}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default AdminControlCard;
