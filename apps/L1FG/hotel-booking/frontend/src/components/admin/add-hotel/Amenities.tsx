import { AmenitiesDialog } from '../ui/dialog';
import { HotelAmenitiesProps } from './type';

export const Amenities = ({ amenities, setAmenities, handleEditHotelAmenities }: HotelAmenitiesProps) => {
  return (
    <div className="border rounded-[8px] border-[#E4E4E7] bg-white flex flex-col p-6">
      <div className="flex justify-between items-center">
        <p className="text-[#09090B] font-Inter text-lg font-semibold">Amenities</p>
        <AmenitiesDialog amenities={amenities} setAmenities={setAmenities} handleEditHotelAmenities={handleEditHotelAmenities} />
      </div>
      <div className="py-6">
        <div className="w-full h-[1px] bg-[#E4E4E7] "></div>
      </div>
      <div className="flex flex-wrap gap-2 " role="list">
        {amenities.length > 0 ? (
          amenities.map((value, index) => (
            <p className="text-[#09090B] font-Inter text-xs font-semibold bg-[#F4F4F5] rounded-full px-[10px] py-[2px]" key={index} role="listitem">
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
