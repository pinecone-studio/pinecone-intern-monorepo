import { SinglePageCard } from '../ui/cards';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const ChooseRoom = () => {
  return (
    <div className="w-full px-[40px] flex flex-col gap-4">
      <h1 className="text-[24px] leading-[32px] font-[600]">Choose your room</h1>
      <Tabs defaultValue="allRooms">
        <TabsList>
          <TabsTrigger value="allRooms">All Rooms</TabsTrigger>
          <TabsTrigger value="oneBed">1 bed</TabsTrigger>
          <TabsTrigger value="twoBed">2 bed</TabsTrigger>
        </TabsList>
        <TabsContent className="mt-4" value="allRooms">
          <div className="grid grid-cols-3 gap-[16px]">
            <SinglePageCard />
            <SinglePageCard />
            <SinglePageCard />
            <SinglePageCard />
            <SinglePageCard />
          </div>
        </TabsContent>
        <TabsContent className="mt-4" value="oneBed">
          <div className="grid grid-cols-3 gap-[16px]">
            <SinglePageCard />
          </div>
        </TabsContent>
        <TabsContent className="mt-4" value="twoBed">
          <div className="grid grid-cols-3 gap-[16px]">
            <SinglePageCard />
            <SinglePageCard />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
