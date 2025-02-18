import { HotelDetailMainProps } from '@/components/user/hotel-detail/HotelDetailMain';

export const Amenities = ({ data }: HotelDetailMainProps) => {
  return (
    <div className="border rounded-[8px] border-[#E4E4E7] bg-white flex flex-col p-6">
      <div className="flex justify-between items-center">
        <p className="text-[#09090B] font-Inter text-lg font-semibold">Amenities</p>
        <div className="px-4 py-2 text-[#2563EB] font-Inter text-sm font-medium">Edit</div>
      </div>
      <div className="py-6">
        <div className="w-full h-[1px] bg-[#E4E4E7] "></div>
      </div>
      <div className="flex gap-2 flex-wrap" role="list">
        {data?.amenities && data?.amenities.length > 0 ? (
          data.amenities.map((value, index) => (
            <p key={index} className="text-[#09090B] font-Inter text-xs font-semibold bg-[#F4F4F5] rounded-full px-[10px] py-[2px]" role="listitem">
              {value}
            </p>
          ))
        ) : (
          <p className="text-[#09090B] font-Inter text-sm font-medium">-/-</p>
        )}
      </div>
    </div>
  );
};
