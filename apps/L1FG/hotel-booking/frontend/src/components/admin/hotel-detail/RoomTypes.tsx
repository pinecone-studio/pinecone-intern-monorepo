import Link from 'next/link';
import { BluePlus } from '../svg';

export const RoomTypes = () => {
  return (
    <div className="border rounded-[8px] border-[#E4E4E7] bg-white flex flex-col gap-4 p-6">
      <div className="flex justify-between">
        <p className="text-[#09090B] font-Inter text-lg font-semibold">Room Types</p>
        <Link href="/admin/add-hotel/add-room" className="px-4 py-2 flex items-center gap-2">
          <BluePlus />
          <p className="text-[#2563EB] font-Inter text-sm font-medium">Add Room</p>
        </Link>
      </div>
      <div className="flex">
        <div className="p-1 rounded-[8px] bg-[#F4F4F5] flex items-center">
          <div className="px-3 py-1 rounded-sm bg-white text-[#09090B] font-Inter text-sm font-medium">All Rooms</div>
          <div className="px-3 py-1 rounded-sm bg-[#F4F4F5] text-[#71717A] font-Inter text-sm font-medium">1 bed</div>
          <div className="px-3 py-1 rounded-sm bg-[#F4F4F5] text-[#71717A] font-Inter text-sm font-medium">2 bed</div>
          <div className="px-3 py-1 rounded-sm bg-[#F4F4F5] text-[#71717A] font-Inter text-sm font-medium">3+ bed</div>
        </div>
      </div>
      <div></div>
    </div>
  );
};
