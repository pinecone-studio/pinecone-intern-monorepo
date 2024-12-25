import React from 'react';
import { GeneralInfoDialog } from '../../dialogs';
import { useAdmin } from '@/components/providers/AdminProvider';
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
          <div className="flex justify-between">
            <div className="flex-1 space-y-1">
              <h6 className="text-muted-foreground">Room number</h6>
              <p>{addRoomForm.values.roomNumber || '-/-'}</p>
            </div>
          </div>
        </div>
      </>
    );
  };
