import { GeneralInfoDialog } from '../ui/dialog';

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
        <div className="flex items-center gap-8">
          <div className="w-full flex flex-col gap-1">
            <p className="text-[#71717A] font-Inter text-sm font-normal">Name</p>
            <p className="text-[#09090B] font-Inter text-sm font-medium">-/-</p>
          </div>
          <div className="w-full flex flex-col gap-1">
            <p className="text-[#71717A] font-Inter text-sm font-normal">Type</p>
            <p className="text-[#09090B] font-Inter text-sm font-medium">-/-</p>
          </div>
          <div className="w-full flex flex-col gap-1">
            <p className="text-[#71717A] font-Inter text-sm font-normal">Price per night</p>
            <p className="text-[#09090B] font-Inter text-sm font-medium">-/-</p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-[#71717A] font-Inter text-sm font-normal">Room Information</p>
          <p className="text-[#09090B] font-Inter text-sm font-medium">-/-</p>
        </div>
      </div>
    </div>
  );
};
