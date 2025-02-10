import { HistoryIcon } from 'lucide-react';

export const NoPrevious = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <HistoryIcon size={24} stroke="#09090B" strokeOpacity={0.5} strokeWidth={1.5} />
      <div className="flex flex-col justify-center gap-1">
        <p className="text-sm font-medium font-Inter text-center mx-auto">No Previous Bookings</p>
        <p className="text-sm font-normal font-Inter text-[#71717A]">Your past stays will appear here once completed.</p>
      </div>
    </div>
  );
};
