export const Amenities = () => {
  const dataAmenities = ['Airport transfer', 'Gym', 'Non-Smoking', 'Free parking', '24/7 front desk', 'Restaurant', 'Bar', 'Spa', 'Air conditioning', 'Laundry facilities', 'Free WiFi'];

  return (
    <div className="border rounded-[8px] border-[#E4E4E7] bg-white flex flex-col p-6">
      <div className="flex justify-between items-center">
        <p className="text-[#09090B] font-Inter text-lg font-semibold">Amenities</p>
        <div className="px-4 py-2 text-[#2563EB] font-Inter text-sm font-medium">Edit</div>
      </div>
      <div className="py-6">
        <div className="w-full h-[1px] bg-[#E4E4E7] "></div>
      </div>
      <div className="flex gap-2 flex-wrap">
        {dataAmenities?.map((amenities, index) => {
          return (
            <p key={index} className="text-[#09090B] font-Inter text-xs font-medium bg-[#F4F4F5] rounded-full px-[10px] py-[2px]">
              {amenities}
            </p>
          );
        })}
      </div>
    </div>
  );
};
