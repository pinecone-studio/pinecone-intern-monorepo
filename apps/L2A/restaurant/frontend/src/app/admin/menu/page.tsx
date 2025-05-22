import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MainCard from "./_features/MainCard";

const MenuPage = () => {
  return (
    <div data-testid="menu-tab" className="flex flex-col items-center justify-center">
      <Tabs defaultValue="tab-products" className="w-[536px] mt-10">
        <TabsList data-testid="tabs-list">
          <TabsTrigger data-testid="tab-products" value="tab-products">
            Цэсний бүтээгдэхүүн
          </TabsTrigger>
          <TabsTrigger data-testid="tab-manage" value="tab-manage">
            Цэс удирдах
          </TabsTrigger>
        </TabsList>
        <TabsContent data-testid="content-products" value="tab-products">
          <MainCard />
        </TabsContent>
        <TabsContent data-testid="content-manage" value="tab-manage">
          add
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MenuPage;
