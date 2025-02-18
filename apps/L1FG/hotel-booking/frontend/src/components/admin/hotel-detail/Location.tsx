import { LocationDialog } from '../ui/dialog';
import { HotelDetailLocationProps } from './type';

export const Location = ({ data, locationName, setLocationName, handleEditHotelLocation }: HotelDetailLocationProps) => {
  return (
    <div className="border rounded-[8px] border-[#E4E4E7] bg-white flex flex-col px-6 pt-4 pb-6 gap-4">
      <div className="flex justify-between items-center">
        <p className="text-[#09090B] font-Inter text-lg font-semibold">Location</p>
        <LocationDialog locationName={locationName} setLocationName={setLocationName} handleEditHotelLocation={handleEditHotelLocation} />
      </div>
      <p className="text-[#09090B] font-Inter text-sm font-normal">{locationName || data?.locationName || '-/-'}</p>
    </div>
  );
};
