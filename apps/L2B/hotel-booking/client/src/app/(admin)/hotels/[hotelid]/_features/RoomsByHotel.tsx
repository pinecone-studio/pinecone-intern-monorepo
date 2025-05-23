import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Image from 'next/image';
import { Room, useRoomsByHotelQuery } from '@/generated';
import { useEffect, useState } from 'react';

export const RoomsByHotel = () => {
  const [rooms, setRooms] = useState<Room[]>();

  const { data } = useRoomsByHotelQuery({
    variables: {
      hotelId: '682ac7df47df32a8a9907cb1',
    },
  });
  console.log(data?.roomsByHotel);

  useEffect(() => {
    setRooms(data?.roomsByHotel);
  }, [data]);

  const getBedLabel = (type: string) => {
    switch (type) {
      case 'single':
        return '1 Bed';
      case 'twin':
      case 'deluxe':
        return '2 Bed';
      case 'family':
        return '3 Bed';
      default:
        return '1 Bed';
    }
  };

  const bedTypes = [
    { value: 'all', label: 'All Rooms', filter: () => true },
    { value: 'one', label: '1 bed', filter: (room: Room) => room.type === 'single' || room.type === 'double' },
    { value: 'two', label: '2 bed', filter: (room: Room) => room.type === 'twin' || room.type === 'deluxe' || room.type === 'suite' },
    { value: 'three', label: '3 bed', filter: (room: Room) => room.type === 'family' },
  ];

  return (
    <div className="mt-4 max-w-[784px] w-full flex p-6 flex-col items-start gap-4 rounded-[8px] border bg-background ">
      <div className="w-full flex justify-between items-start ">
        <h3 className="text-[18px] font-[600] leading-[28px] ">Room Types</h3>
        <Button variant={'outline'} className="flex gap-2 hover:bg-white text-[14px] font-[500] leading-[20px] hover:text-[#2563EB] text-[#2563EB] ">
          <Plus />
          Add Room
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          {bedTypes.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {bedTypes.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="rounded-md border w-full">
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">ID</TableHead>
                  <TableHead className="w-[250px]">Name</TableHead>
                  <TableHead className="w-[120px]">Price</TableHead>
                  <TableHead className="w-[100px]">Bed</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rooms?.filter(tab.filter).map((room: Room, index) => (
                  <TableRow key={index} className="cursor-pointer">
                    <TableCell className="border-r-[1px]">{room.roomNumber}</TableCell>
                    <TableCell className="flex items-center gap-3 border-r-[1px]">
                      <Image src={room.images[0]} alt="" width={100} height={100} className="w-12 h-12 rounded object-cover" />
                      <span className="text-[14px] font-[500]">{room.name}</span>
                    </TableCell>
                    <TableCell className="border-r-[1px] w-[148px]">{room.pricePerNight}</TableCell>
                    <TableCell className="w-[116px]">{getBedLabel(room.type)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
