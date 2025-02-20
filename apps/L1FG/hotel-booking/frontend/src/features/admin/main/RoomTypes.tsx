'use client';

import { BluePlus } from '../../../components/admin/svg';
import { Room, useCreateRoomMutation, useGetRoomsByHotelIdQuery } from '@/generated';
import { useRouter, useSearchParams } from 'next/navigation';
import { RoomDataTable } from '../../../components/admin/add-hotel/RoomDataTable';
import { useState, useMemo } from 'react';

export const RoomTypes = () => {
  const [filter, setFilter] = useState<'all' | '1' | '2' | '3+'>('all');
  const [createRoom] = useCreateRoomMutation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const hotelId = searchParams.get('id');

  const { data, refetch } = useGetRoomsByHotelIdQuery({
    variables: { hotelId: hotelId ?? '' },
    skip: !hotelId,
  });

  const roomData = useMemo(() => {
    return data?.getRoomsByHotelId?.filter((room): room is Room => room !== null) ?? [];
  }, [data]);

  const filteredRooms = useMemo(() => {
    if (filter === 'all') return roomData;
    const bedCount = filter === '3+' ? 3 : parseInt(filter, 10);
    return roomData.filter((room) => (filter === '3+' ? (room.bed ?? 0) >= 3 : room.bed === bedCount));
  }, [filter, roomData]);

  const handleCreateRoom = async () => {
    if (!hotelId) return console.error('Hotel ID is missing');

    try {
      const variables = {
        input: {
          name: '-/-',
          type: '-/-',
          roomInfo: ['-/-'],
          hotelId,
          bed: 0,
          tax: 0,
          price: 0,
          roomNumber: 0,
          images: ['https://www.trical.co.nz/modules/custom/legrand_ecat/assets/img/no-image.png'],
          roomServices: Array(2).fill({ key: '-/-', value: '-/-' }),
        },
      };
      const response = await createRoom({ variables });
      const roomId = response?.data?.createRoom?.room?.id;

      if (roomId) {
        await refetch();
        router.push(`/admin/add-room/add-room?id=${roomId}`);
      }
    } catch (error) {
      console.error('Error creating room:', error);
    }
  };

  return (
    <div className="border rounded-[8px] border-[#E4E4E7] bg-white flex flex-col gap-4 p-6">
      <div className="flex justify-between">
        <p className="text-[#09090B] font-Inter text-lg font-semibold">Room Types</p>
        <button onClick={handleCreateRoom} className="px-4 py-2 flex items-center gap-2 hover:bg-[#FAFAFA] rounded-sm transition-all duration-200">
          <BluePlus />
          <p className="text-[#2563EB] font-Inter text-sm font-medium">Add Room</p>
        </button>
      </div>
      <div className="flex">
        <div className="p-1 rounded-[8px] bg-[#F4F4F5] flex items-center">
          {['all', '1', '2', '3+'].map((value) => (
            <button
              key={value}
              onClick={() => setFilter(value as 'all' | '1' | '2' | '3+')}
              className={`px-3 py-1 rounded-sm font-Inter text-sm font-medium transition-all duration-200 ${
                filter === value ? 'bg-white text-[#09090B]' : 'bg-[#F4F4F5] text-[#71717A] hover:bg-[#FAFAFA]'
              }`}
            >
              {value === 'all' ? 'All Rooms' : `${value} bed`}
            </button>
          ))}
        </div>
      </div>
      <RoomDataTable data={filteredRooms} />
    </div>
  );
};
