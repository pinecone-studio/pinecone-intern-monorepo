import { OrangeStar, Phone } from '../svg';

export const GeneralInfo = () => {
  return (
    <div className="border rounded-[8px] border-[#E4E4E7] bg-white flex flex-col p-6">
      <div className="flex justify-between items-center">
        <p className="text-[#09090B] font-Inter text-lg font-semibold">General Info</p>
        <div className="px-4 py-2 text-[#2563EB] font-Inter text-sm font-medium">Edit</div>
      </div>
      <div className="py-6">
        <div className="w-full h-[1px] bg-[#E4E4E7] "></div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <p className="text-[#71717A] font-Inter text-sm font-normal">Name</p>
          <p className="text-[#09090B] font-Inter text-sm font-medium">Chingis Khaan Hotel</p>
        </div>
        <div className="flex items-center">
          <div className="w-full flex flex-col gap-1">
            <p className="text-[#71717A] font-Inter text-sm font-normal">Phone Number</p>
            <div className="flex items-center gap-2">
              <Phone />
              <p className="text-[#09090B] font-Inter text-sm font-normal">72700800</p>
            </div>
          </div>
          <div className="w-full flex flex-col gap-1">
            <p className="text-[#71717A] font-Inter text-sm font-normal">Rating</p>
            <div className="flex items-center gap-2">
              <div className="px-[10px] py-[2px] rounded-full bg-[#2563EB] ">
                <p className="text-[#FAFAFA] font-Inter text-xs font-semibold">8.6</p>
              </div>
              <p className="text-[#09090B] font-Inter text-sm font-medium">Excellent</p>
            </div>
          </div>
          <div className="w-full flex flex-col gap-1">
            <p className="text-[#71717A] font-Inter text-sm font-normal">Stars Rating</p>
            <div className="flex items-center gap-1">
              <OrangeStar />
              <OrangeStar />
              <OrangeStar />
              <OrangeStar />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-[#71717A] font-Inter text-sm font-normal">Description</p>
          <p className="text-[#09090B] font-Inter text-sm font-medium">Ulaanbaatar hotel in Downtown Ulaanbaatar with 4 restaurants and a full-service spa</p>
        </div>
      </div>
    </div>
  );
};
