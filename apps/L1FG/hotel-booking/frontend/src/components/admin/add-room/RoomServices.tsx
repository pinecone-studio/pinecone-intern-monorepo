'use client';

import { RoomServicesDialog } from '../ui/dialog/add-room/RoomServicesDialog';
import { RoomServicesProps } from './type';

// Component for displaying a service category section
const ServiceCategory = ({ title, services }: { title: string; services: string[] }) => (
  <div className="w-full flex flex-col gap-3">
    <p className="text-[#71717A] font-Inter text-sm font-normal">{title}</p>
    <div className="flex flex-wrap gap-2" role="list">
      {services.length > 0 ? (
        services.map((value, index) => (
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

// Component for a row of two service categories
const ServiceRow = ({
  category1Title,
  category1Services,
  category2Title,
  category2Services,
}: {
  category1Title: string;
  category1Services: string[];
  category2Title: string;
  category2Services: string[];
}) => (
  <div className="flex items-center gap-8">
    <ServiceCategory title={category1Title} services={category1Services} />
    <ServiceCategory title={category2Title} services={category2Services} />
  </div>
);

export const RoomServices = ({
  accessibility,
  bathroom,
  bedroom,
  foodAndDrink,
  internet,
  other,
  setAccessibility,
  setBathroom,
  setBedroom,
  setFoodAndDrink,
  setInternet,
  setOther,
  handleEditRoomServices,
}: RoomServicesProps) => {
  return (
    <div className="border rounded-[8px] border-[#E4E4E7] bg-white flex flex-col p-6">
      <div className="flex justify-between items-center">
        <p className="text-[#09090B] font-Inter text-lg font-semibold">Room Services</p>
        <RoomServicesDialog
          accessibility={accessibility}
          bedroom={bedroom}
          bathroom={bathroom}
          foodAndDrink={foodAndDrink}
          internet={internet}
          other={other}
          setAccessibility={setAccessibility}
          setBedroom={setBedroom}
          setBathroom={setBathroom}
          setFoodAndDrink={setFoodAndDrink}
          setInternet={setInternet}
          setOther={setOther}
          handleEditRoomServices={handleEditRoomServices}
        />
      </div>
      <div className="py-6">
        <div className="w-full h-[1px] bg-[#E4E4E7]"></div>
      </div>
      <div className="flex flex-col gap-8">
        <ServiceRow category1Title="Bathroom" category1Services={bathroom} category2Title="Accessibility" category2Services={accessibility} />
        <ServiceRow category1Title="Bedroom" category1Services={bedroom} category2Title="Internet" category2Services={foodAndDrink} />
        <ServiceRow category1Title="Food and drink" category1Services={internet} category2Title="Other" category2Services={other} />
      </div>
    </div>
  );
};
