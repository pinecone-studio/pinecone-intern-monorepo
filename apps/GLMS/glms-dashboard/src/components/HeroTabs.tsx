import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const HeroTabs = () => {
  return (
    <div className="container mx-auto mt-1">
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="lesson">Хичээл</TabsTrigger>
          <TabsTrigger value="sketch">Ноорог</TabsTrigger>
          <TabsTrigger value="archive">Архив</TabsTrigger>
        </TabsList>
        <TabsContent value="lesson">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint, ducimus.</TabsContent>
        <TabsContent value="sketch">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit, harum!</TabsContent>
        <TabsContent value="archive">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi, cumque.</TabsContent>
      </Tabs>
    </div>
  );
};
