'use client';

import { PhoneIcon, StarFillIcon } from '@/components/icon';
import { Button } from '@/components/ui/button';
import * as Icons from 'lucide-react';

type HotelDetailsComponentProps = {
  name?: string;
  phone?: string;
  desc?: string;
  rating?: number;
  stars?: number;
  location?: string;
};

type Amenity = {
  name: string;
  icon: keyof typeof Icons; // This ensures the icon is a valid key from the 'lucide-react' Icons module
};

const Amenities: Amenity[] = [
  { name: 'Parking available', icon: 'CircleParkingOff' },
  { name: '24/7 front desk', icon: 'ConciergeBell' },
  { name: 'Air conditioning', icon: 'AirVent' },
  { name: 'Gym', icon: 'Dumbbell' },
  { name: 'Pet-friendly', icon: 'Cat' },
  { name: 'Non-smoking', icon: 'CigaretteOff' },
  { name: 'Bar', icon: 'Martini' },
  { name: 'Restaurant', icon: 'Utensils' },
  { name: 'Laundry', icon: 'WashingMachine' },
];
export const HotelDetailsComponent = ({ name, phone, desc, rating, stars, location }: HotelDetailsComponentProps) => {
  return (
    <div className="flex gap-12">
      <div className="flex flex-col ">
        <div className="flex flex-col gap-2 mb-6">
          <h2 className="text-[30px] font-semibold">{name}</h2>
          <div className="flex">
            {Array.from({ length: stars || 1 }).map((_, index) => (
              <StarFillIcon key={index} />
            ))}
          </div>
          <p>{desc}</p>
        </div>
        <div className="flex gap-2 items-center ">
          <div
            className="flex gap-2 items-center
           mb-2"
          >
            <div className="py-[2px] px-[10px] bg-[#2563EB] text-white rounded-full">{rating}</div>
            Excelent
          </div>
        </div>
        <div className="border-t-[1px] border-border my-4"></div>
        <div className="flex flex-col gap-4">
          <p className="font-bold">Most popular facilities</p>
          <div className="grid grid-cols-3 gap-4  ">
            {Amenities.map((amenity, index) => {
              const IconComponent = Icons[amenity.icon] as React.ComponentType<React.SVGProps<SVGSVGElement>>;
              return (
                <div key={index} className="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
                  <IconComponent className="w-4 h-4" />
                  <p className="text-sm font-medium">{amenity.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <p className="font-semibold">Location</p>

        <div className="px-4 pt-4 border rounded-md">
          <p>{location}</p>
          <Button
            className="text-blue-600 hover:bg-white p-0 py-2 bg-white
           "
            variant="outline"
          >
            View in Google maps
          </Button>
        </div>

        <p className="font-semibold">Contact</p>

        <div className="flex gap-3">
          <div className="flex flex-col items-center justify-center ">
            <PhoneIcon />
          </div>

          <div className="flex flex-col ">
            <p className="text-[#71717A]">Phone Number</p>
            <p>{phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
