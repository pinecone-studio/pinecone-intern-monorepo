import React from 'react';
import { RoomServicesDialog } from '../../dialogs';

const mock = [
  {
    name: 'Bathroom',
    items: ['Shower', 'Bath', 'WC', 'Slippers', 'Toilet', 'Hairdryer', 'Bathrobes', 'Free toiletries', 'Shower/tub combination', 'Slippers', 'Towels'],
  },
  {
    name: 'Accessibility',
    items: ['Thin carpet', 'Access via exterior corridors'],
  },
  {
    name: 'Bedroom',
    items: ['Air conditioning', 'Bed sheets', 'Cribs (infant beds) not available', 'Heating'],
  },
  {
    name: 'Bathroom',
    items: ['Bathrobes', 'Free toiletries', 'Hair dryer', 'Private Bathroom', 'Shower/tub combination', 'Slippers', 'Toothbrush and toothpaste', 'Towels'],
  },
  {
    name: 'Entertainment',
    items: ['Cable channels', 'TV'],
  },
];
export const RoomDetailsRoomServices = () => {
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Room Services</h1>
        <RoomServicesDialog />
      </div>
      <div className="w-full border-t my-6"></div>
      <div className="grid grid-cols-2 gap-y-8 gap-x-6 text-sm">
        {mock.map(({ name, items }, index) => (
          <div key={index} className="space-y-3">
            <h6 className="text-muted-foreground">{name}</h6>
            <div className="flex flex-wrap gap-2">
              {items.map((item, index) => (
                <span key={index} className="px-4 py-1 text-xs font-semibold text-black bg-gray-100 rounded-full shadow">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
