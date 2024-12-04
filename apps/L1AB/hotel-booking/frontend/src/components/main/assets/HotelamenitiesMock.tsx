// HotelDetailsAmenities.tsx
import React from 'react';

interface Amenity {
  name: string;
}

interface HotelDetailsAmenitiesProps {
  amenities: Amenity[];
}

export const HotelDetailsAmenities: React.FC<HotelDetailsAmenitiesProps> = ({ amenities }) => {
  if (amenities.length === 0) {
    return <p className="text-sm text-gray-500">No amenities available.</p>;
  }

  return (
    <div className="mt-4">
      <div className="flex flex-col gap-2">
        {amenities.map((amenity, index) => (
          <div key={index} className="p-1">
            <p className="text-sm text-gray-800 font-thin">{amenity.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Mock data for amenities
export const mockAmenities = [
  { name: 'Free Wi-Fi' },
  { name: 'Swimming Pool' },
  { name: 'Gym Access' },
  { name: 'Spa Services' },
  { name: 'Free Breakfast' },
  { name: 'Parking' },
  { name: 'Room Service' },
  { name: 'Air Conditioning' },
];
