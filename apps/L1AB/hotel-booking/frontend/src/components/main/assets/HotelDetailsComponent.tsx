import { PhoneIcon, StarFillIcon } from '@/components/icon';
import { Button } from '@/components/ui/button';

type HotelDetailsComponentProps = {
  name?: string;
  phone?: string;
  desc?: string;
  rating?: number;
  stars?: number;
  location?: string;
};

const Amenities = [
  { name: 'Parking available' },
  { name: '24/7 front desk' },
  { name: 'Air conditioning' },
  { name: 'Gym' },
  { name: 'Pet-friendly' },
  { name: 'Non-smoking' },
  { name: 'Bar' },
  { name: 'Restaurant' },
  { name: 'Laundry' },
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
            {Amenities.map((amenity, index) => (
              <div key={index} className="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
                <p className="text-sm font-medium">{amenity.name}</p>
              </div>
            ))}
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
