import React from 'react';
import { AmenityDialog } from '../../dialogs/AmenityDialog';
export const HotelDetailsAmenities = () => {
  const amenities = ['Airport transfer', 'Gym', 'Non-Smoking', 'Free parking', '24/7 front desk', 'Restaurant', 'Bar', 'Spa', 'Air conditioning', 'Laundry facilities', 'Free WiFi'];

  return (
    <div data-testid="HotelDetailsAmenities" className="flex flex-col">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Amenities</h3>
        <AmenityDialog />
      </div>

      <div className="border-t w-full my-6"></div>
      <div className="flex flex-wrap gap-2">
        {amenities.map((amenity, index) => (
          <span key={index} className="px-4 py-1 text-sm font-medium text-black bg-gray-100 rounded-full shadow">
            {amenity}
          </span>
        ))}
      </div>
    </div>
  );
};
