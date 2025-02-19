import { Room } from '@/generated';
import { SinglePageCard } from '../ui/cards';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export interface ChooseRoomProps {
  hotelRoomData: (Room | null)[] | undefined | null;
}

export const ChooseRoom = ({ hotelRoomData }: ChooseRoomProps) => {
  const oneBedRooms = hotelRoomData?.filter((room) => room?.bed === 1);
  const twoBedRooms = hotelRoomData?.filter((room) => room?.bed === 2);
  const threeBedRooms = hotelRoomData?.filter((room) => room && room.bed !== null && room.bed !== undefined && room.bed >= 3);

  return (
    <div className="w-full px-[40px] flex flex-col gap-4">
      <h1 className="text-[24px] leading-[32px] font-[600]">Choose your room</h1>
      <Tabs defaultValue="allRooms">
        <TabsList>
          <TabsTrigger value="allRooms">All Rooms</TabsTrigger>
          <TabsTrigger value="oneBed">1 bed</TabsTrigger>
          <TabsTrigger value="twoBed">2 bed</TabsTrigger>
          <TabsTrigger value="threeBed">+3 bed</TabsTrigger>
        </TabsList>
        <TabsContent className="mt-4" value="allRooms">
          <div className="grid grid-cols-3 gap-[16px]">
            {hotelRoomData?.map((rooms) => (
              <SinglePageCard key={rooms?.id} rooms={rooms} />
            ))}
          </div>
        </TabsContent>
        <TabsContent className="mt-4" value="oneBed">
          <div className="grid grid-cols-3 gap-[16px]">
            {oneBedRooms?.map((rooms) => (
              <SinglePageCard key={`${rooms?.id}1`} rooms={rooms} />
            ))}
          </div>
        </TabsContent>
        <TabsContent className="mt-4" value="twoBed">
          <div className="grid grid-cols-3 gap-[16px]">
            {twoBedRooms?.map((rooms) => (
              <SinglePageCard key={`${rooms?.id}2`} rooms={rooms} />
            ))}
          </div>
        </TabsContent>
        <TabsContent className="mt-4" value="threeBed">
          <div className="grid grid-cols-3 gap-[16px]">
            {threeBedRooms?.map((rooms) => (
              <SinglePageCard key={`${rooms?.id}3`} rooms={rooms} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
