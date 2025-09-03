import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MenuGroupCard } from './MenuGroupCard';
import { MenuProductCard } from './MenuProductCard';

export const MenuCardAdmin = () => {
  return (
    <div data-testid="menu-card" className="flex w-[600px] flex-col">
      <Tabs data-testid="menu-tabs" defaultValue="Цэсний бүтээгдэхүүн">
        <TabsList className="rounded-lg p-1 bg-[#FFFFFF]">
          <TabsTrigger data-testid="menu-product" className="rounded-sm bg-[#F4F4F5]" value="Цэсний бүтээгдэхүүн">
            Цэсний бүтээгдэхүүн
          </TabsTrigger>
          <TabsTrigger data-testid="menu-group" className="rounded-sm bg-[#F4F4F5]" value="Цэс удирдах">
            Цэс удирдах
          </TabsTrigger>
        </TabsList>
        <TabsContent value="Цэсний бүтээгдэхүүн">
          <MenuProductCard />
        </TabsContent>
        <TabsContent value="Цэс удирдах">
          <MenuGroupCard />
        </TabsContent>
      </Tabs>
    </div>
  );
};
