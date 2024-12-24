import React from 'react';
import { GeneralInfoDialog } from '../../dialogs';
import { useAdmin } from '@/components/providers/AdminProvider';

const roomInfo = [
  '18 sq m',
  'Free bottle water',
  'Free self parking',
  'Private bathroom',
  'Air conditioning',
  'Bathrobes',
  'Shower/tub combination',
  '1 Double Bed',
  'Sleeps 2',
  'Free breakfast',
  'Desk',
  'Free WiFi',
];
export const RoomDetailsGeneralInfo = () => {
  const { addRoomForm } = useAdmin();
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">General Info</h1>
        <GeneralInfoDialog />
      </div>
      <div className="w-full border-t my-6"></div>
      <div className="text-sm space-y-6">
        <div className="flex justify-between">
          <div className="flex-1 space-y-1">
            <h6 className="text-muted-foreground">Name</h6>
            <p className="font-medium">{addRoomForm.values.name || '-/-'}</p>
          </div>
          <div className="flex-1 space-y-1">
            <h6 className="text-muted-foreground">Type</h6>
            <p>{addRoomForm.values.roomType || '-/-'}</p>
          </div>
          <div className="flex-1 space-y-1">
            <h6 className="text-muted-foreground">Price per night</h6>
            <p>{addRoomForm.values.price || '-/-'}</p>
          </div>
        </div>
        <div className="space-y-2">
          <h6 className="text-muted-foreground">Room Information</h6>
          <div className="grid grid-cols-3 gap-3">
            {roomInfo.map((info, index) => (
              <p key={index}>{info}</p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
