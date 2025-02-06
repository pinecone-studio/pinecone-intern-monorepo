import { Phone } from 'lucide-react';
import { GeneralInfoDialog } from '../ui/dialog';
import { Star } from '../svg';

export const GeneralInfo = () => {
  return (
    <div className="border rounded-[8px] border-[#E4E4E7] bg-white flex flex-col p-6">
      <div className="flex justify-between items-center">
        <p className="text-[#09090B] font-Inter text-lg font-semibold">General Info</p>
        <GeneralInfoDialog />
      </div>
      <div className="py-6">
        <div className="w-full h-[1px] bg-[#E4E4E7] "></div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <p className="text-[#71717A] font-Inter text-sm font-normal">Name</p>
          <p className="text-[#09090B] font-Inter text-sm font-medium">-/-</p>
        </div>
        <div className="flex items-center">
          <div className="w-full flex flex-col gap-1">
            <p className="text-[#71717A] font-Inter text-sm font-normal">Phone Number</p>
            <div className="flex items-center gap-2">
              <Phone size={16} />
              <p className="text-[#09090B] font-Inter text-sm font-medium">-/-</p>
            </div>
          </div>
          <div className="w-full flex flex-col gap-1">
            <p className="text-[#71717A] font-Inter text-sm font-normal">Rating</p>
            <div className="flex items-center gap-2">
              <div className="px-[10px] py-[2px] rounded-full bg-[#2563EB] ">
                <p className="text-[#FAFAFA] font-Inter text-xs font-semibold">0.0</p>
              </div>
              <p className="text-[#09090B] font-Inter text-sm font-medium">None</p>
            </div>
          </div>
          <div className="w-full flex flex-col gap-1">
            <p className="text-[#71717A] font-Inter text-sm font-normal">Stars Rating</p>
            <div className="flex items-center gap-1">
              <Star />
              <Star />
              <Star />
              <Star />
              <Star />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-[#71717A] font-Inter text-sm font-normal">Description</p>
          <p className="text-[#09090B] font-Inter text-sm font-medium">-/-</p>
        </div>
      </div>
    </div>
  );
};
