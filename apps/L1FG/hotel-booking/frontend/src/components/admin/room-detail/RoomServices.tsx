'use client';

import { useMemo } from 'react';
import { RoomServicesDialog } from '../ui/dialog/add-room/RoomServicesDialog';
import { RoomServicesProps } from './type';

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

const ServiceCategoriesGrid = ({
  services,
}: {
  services: {
    title: string;
    items: string[];
  }[];
}) => (
  <div className="flex flex-col gap-8">
    {Array.from({ length: Math.ceil(services.length / 2) }, (_, i) => (
      <div key={i} className="flex items-center gap-8">
        <ServiceCategory title={services[i * 2].title} services={services[i * 2].items} />
        {services[i * 2 + 1] && <ServiceCategory title={services[i * 2 + 1].title} services={services[i * 2 + 1].items} />}
      </div>
    ))}
  </div>
);

const useProcessedServices = (data: RoomServicesProps['data']) => {
  return useMemo(
    () => ({
      roomAccessibility: (data?.accessibility ?? []).filter((item): item is string => item !== null),
      roomBathroom: (data?.bathroom ?? []).filter((item): item is string => item !== null),
      roomBedroom: (data?.bedroom ?? []).filter((item): item is string => item !== null),
      roomFoodAndDrink: (data?.foodAndDrink ?? []).filter((item): item is string => item !== null),
      roomInternet: (data?.internet ?? []).filter((item): item is string => item !== null),
      roomOther: (data?.other ?? []).filter((item): item is string => item !== null),
    }),
    [data]
  );
};

const RoomServicesHeader = ({ dialogProps }: { dialogProps: Omit<RoomServicesProps, 'data'> }) => (
  <>
    <div className="flex justify-between items-center">
      <p className="text-[#09090B] font-Inter text-lg font-semibold">Room Services</p>
      <RoomServicesDialog {...dialogProps} />
    </div>
    <div className="py-6">
      <div className="w-full h-[1px] bg-[#E4E4E7]"></div>
    </div>
  </>
);

export const RoomServices = (props: RoomServicesProps) => {
  const { data, ...dialogProps } = props;
  const processedServices = useProcessedServices(data);

  const serviceCategories = [
    { title: 'Bathroom', items: processedServices.roomBathroom },
    { title: 'Accessibility', items: processedServices.roomAccessibility },
    { title: 'Bedroom', items: processedServices.roomBedroom },
    { title: 'Internet', items: processedServices.roomInternet },
    { title: 'Food and drink', items: processedServices.roomFoodAndDrink },
    { title: 'Other', items: processedServices.roomOther },
  ];

  return (
    <div className="border rounded-[8px] border-[#E4E4E7] bg-white flex flex-col p-6">
      <RoomServicesHeader dialogProps={dialogProps} />
      <ServiceCategoriesGrid services={serviceCategories} />
    </div>
  );
};
