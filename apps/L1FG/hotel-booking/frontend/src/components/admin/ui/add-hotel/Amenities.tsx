import { AmenitiesDialog } from '../dialog/AmenitiesDialog';

export const Amenities = () => {
  return (
    <div className="border rounded-[8px] border-[#E4E4E7] bg-white flex flex-col p-6">
      <div className="flex justify-between items-center">
        <p className="text-[#09090B] font-Inter text-lg font-semibold">Amenities</p>
        <AmenitiesDialog />
      </div>
      <div className="py-6">
        <div className="w-full h-[1px] bg-[#E4E4E7] "></div>
      </div>
      <p className="text-[#09090B] font-Inter text-sm font-medium">-/-</p>
    </div>
  );
};
