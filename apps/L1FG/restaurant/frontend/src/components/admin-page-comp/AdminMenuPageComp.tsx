import React from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminProductCard from './AdminProductCard';
import AdminControlCard from './AdminControlCard';

const AdminMenuPageComp = () => {
  return (
    <div className="flex flex-col items-center bg-[#F4F4F5] w-[100vw] min-h-[91.4vh] gap-4 py-14">
      <div className="flex w-[600px] justify-between mb-5">
        <Tabs defaultValue="products" className="w-[600px]  ">
          <TabsList className="grid w-max grid-cols-2 bg-white ">
            <TabsTrigger className=" bg-[#F4F4F5]" value="products">
              Цэсний бүтээгдэхүүн
            </TabsTrigger>
            <TabsTrigger className="bg-[#F4F4F5]" value="control">
              Цэс удирдах
            </TabsTrigger>
          </TabsList>
          <TabsContent value="products">
            <AdminProductCard />
          </TabsContent>
          <TabsContent value="control">
            <AdminControlCard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminMenuPageComp;
