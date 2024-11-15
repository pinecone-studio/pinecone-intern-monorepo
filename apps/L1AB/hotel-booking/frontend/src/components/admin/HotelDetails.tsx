import React from 'react';
import { LocationDialog } from './dialogs';
import { AmenityDialog } from './dialogs/AmenityDialog';

export const HotelDetails = () => {
  return (
    <div>
      <div>HotelDetails</div>
      <div>
        <AmenityDialog />
      </div>
      <div>
        <LocationDialog />
      </div>
    </div>
  );
};
