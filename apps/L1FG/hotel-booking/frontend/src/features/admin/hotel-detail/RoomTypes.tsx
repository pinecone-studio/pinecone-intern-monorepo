'use client';

import { RoomDataTable } from '@/components/admin/add-hotel';
import { BluePlus } from '@/components/admin/svg';

import { Room, useCreateRoomMutation, useGetRoomsByHotelIdQuery } from '@/generated';
import { useParams, useRouter } from 'next/navigation';
import { useState, useMemo } from 'react';

export const RoomTypes = () => {
  const [filter, setFilter] = useState<'all' | '1' | '2' | '3+'>('all');
  const [createRoom] = useCreateRoomMutation();
  const router = useRouter();
  const params = useParams();
  const hotelId = Array.isArray(params?.id) ? params.id[0] : params?.id;

  // React Hook-ийг нөхцөлгүй дуудна
  const { data, refetch } = useGetRoomsByHotelIdQuery({
    variables: { hotelId: hotelId || '' },
    skip: !hotelId, // Зөвхөн hotelId байх үед л Query гүйцэтгэнэ
  });

  const roomData = useMemo(() => {
    return data?.getRoomsByHotelId?.filter((room): room is Room => room !== null) ?? [];
  }, [data]);
  const filteredRooms = useMemo(() => {
    return roomData.filter((room) => {
      switch (filter) {
        case '1':
          return room.bed === 1;
        case '2':
          return room.bed === 2;
        case '3+':
          return (room.bed ?? 0) >= 3;
        default:
          return true;
      }
    });
  }, [filter, roomData]); // Зөвхөн эдгээр хувьсагч өөрчлөгдөх үед л дахин тооцоолол хийнэ.

  const handleCreateRoom = async () => {
    if (!hotelId) {
      console.error('Room ID is missing');
      return;
    }

    try {
      const variables = {
        input: {
          name: '-/-',
          type: '-/-',
          roomInfo: ['-/-'],
          hotelId: hotelId,
          bed: 0,
          tax: 0,
          price: 0,
          roomNumber: 0,
          images: ['https://static-00.iconduck.com/assets.00/no-image-icon-512x512-lfoanl0w.png'],
          roomServices: [
            { key: '-/-', value: '-/-' },
            { key: '-/-', value: '-/-' },
          ],
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

  const renderFilterButton = (filterType: 'all' | '1' | '2' | '3+', label: string) => (
    <button
      onClick={() => setFilter(filterType)}
      className={`px-3 py-1 rounded-sm font-Inter text-sm font-medium transition-all duration-200 ${
        filter === filterType ? 'bg-white text-[#09090B]' : 'bg-[#F4F4F5] text-[#71717A] hover:bg-[#FAFAFA]'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="border rounded-[8px] border-[#E4E4E7] bg-white flex flex-col gap-4 p-6">
      <div className="flex justify-between">
        <p className="text-[#09090B] font-Inter text-lg font-semibold">Room Types</p>
        <button onClick={handleCreateRoom} className="px-4 py-2 flex items-center gap-2 hover:bg-[#F4F4F5] rounded-sm transition-all duration-200">
          <BluePlus />
          <p className="text-[#2563EB] font-Inter text-sm font-medium">Add Room</p>
        </button>
      </div>
      <div className="flex">
        <div className="p-1 rounded-[8px] bg-[#F4F4F5] flex items-center">
          {renderFilterButton('all', 'All Rooms')}
          {renderFilterButton('1', '1 bed')}
          {renderFilterButton('2', '2 bed')}
          {renderFilterButton('3+', '3+ bed')}
        </div>
      </div>
      <RoomDataTable data={filteredRooms} />
    </div>
  );
};
