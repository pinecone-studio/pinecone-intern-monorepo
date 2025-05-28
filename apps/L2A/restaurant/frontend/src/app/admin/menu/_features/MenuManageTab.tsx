import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AllCategory from './AllCategory';
import MenuList from './MenuList';
import DiscountList from './DiscountList';

const MenuManageTab = () => {
  return (
    <div data-testid="menu-tab" className="flex flex-col items-center justify-center">
      <Tabs data-testid="all-menu" defaultValue="all" className="w-[536px] mt-7">
        <TabsList data-testid="tabs-list" className="w-[368px] flex justify-around">
          <TabsTrigger data-testid="all" value="all" className="w-[120px]">
            Бүгд
          </TabsTrigger>
          <TabsTrigger data-testid="menu1" value="menu" className="w-[120px]">
            Цэс.
          </TabsTrigger>
          <TabsTrigger data-testid="discount1" value="discount" className="w-[120px]">
            Хямдрал.
          </TabsTrigger>
        </TabsList>
        <TabsContent data-testid="all" value="all">
          <AllCategory />
        </TabsContent>
        <TabsContent data-testid="menu2" value="menu">
          <MenuList />
        </TabsContent>
        <TabsContent data-testid="discount2" value="discount">
          <DiscountList />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MenuManageTab;