'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MenuCard from './ProductCard';

const MainTab = () => {
  return (
    <div data-testid="menu-tab">
      <Tabs data-testid="Table" defaultValue="tab-products" className="w-[536px] mt-10">
        <TabsList data-testid="tabs-list">
          <TabsTrigger data-testid="tab-products" value="tab-products">
            Цэсний бүтээгдэхүүн
          </TabsTrigger>
          <TabsTrigger data-testid="tab-manage" value="tab-manage">
            Цэс удирдах
          </TabsTrigger>
        </TabsList>
        <TabsContent data-testid="content-products" value="tab-products">
          <MenuCard />
        </TabsContent>
        <TabsContent data-testid="content-manage" value="tab-manage">
          add
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MainTab;
