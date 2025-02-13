'use client';

import { BluePlus } from '../svg';
import { useCreateRoomMutation } from '@/generated';
import { useRouter } from 'next/navigation';

export const RoomTypes = () => {
  const [createRoom] = useCreateRoomMutation();
  const router = useRouter();

  const handleCreateRoom = async () => {
    try {
      const variables = {
        input: {
          name: '-/-',
          type: '-/-',
          roomInfo: ['-/-'],
          hotelId: '678ccc1ba4e7125effcba05e',
          bed: 0,
          tax: 0,
          price: 0,
          roomNumber: 0,
          images: ['-/-'],
          roomServices: [
            { key: '-/-', value: '-/-' },
            { key: '-/-', value: '-/-' },
          ],
        },
      };

      const response = await createRoom({ variables });
      const roomId = response?.data?.createRoom?.room?.id;

      router.push(`/admin/add-room/add-room?id=${roomId}`);
    } catch (error) {
      console.error('Error creating room:', error);
    }
  };

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
          <div className="px-3 py-1 rounded-sm bg-white text-[#09090B] font-Inter text-sm font-medium">All Rooms</div>
          <div className="px-3 py-1 rounded-sm bg-[#F4F4F5] text-[#71717A] font-Inter text-sm font-medium">1 bed</div>
          <div className="px-3 py-1 rounded-sm bg-[#F4F4F5] text-[#71717A] font-Inter text-sm font-medium">2 bed</div>
          <div className="px-3 py-1 rounded-sm bg-[#F4F4F5] text-[#71717A] font-Inter text-sm font-medium">3+ bed</div>
        </div>
      </div>
      <div>
        <p></p>
      </div>
    </div>
  );
};
