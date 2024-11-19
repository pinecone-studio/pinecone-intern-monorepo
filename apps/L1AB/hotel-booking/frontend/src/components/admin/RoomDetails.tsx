import React from 'react';
import { DetailsCard, DetailsContainer, DetailsLeft, DetailsRight, ImagesCarousel } from './assets';
import { RoomServicesDialog } from './dialogs/RoomServicesDialog';
import { GeneralInfoDialog } from './dialogs';
import { Button } from '@/components/ui/button';

export const RoomDetails = () => {
  return (
    <DetailsContainer name={'Flower Hotel Ulaanbaatar'}>
      <DetailsLeft>
        <DetailsCard>
          <div className="flex justify-between items-center">
            <h1 className="text-lg font-semibold">General Info</h1>
            <GeneralInfoDialog />
          </div>
          <div className="w-full border-t my-6"></div>
          <div>one</div>
        </DetailsCard>
        <DetailsCard>
          <div className="flex justify-between items-center">
            <h1 className="text-lg font-semibold">Upcoming Bookings</h1>
          </div>
          <div className="mt-4">two</div>
        </DetailsCard>
        <DetailsCard>
          <div className="flex justify-between items-center">
            <h1 className="text-lg font-semibold">Room Services</h1>
            <RoomServicesDialog />
          </div>
          <div className="w-full border-t my-6"></div>
          <div>three</div>
        </DetailsCard>
      </DetailsLeft>
      <DetailsRight>
        <DetailsCard>
          <div className="flex justify-between items-center">
            <h1 className="text-lg font-semibold">Images</h1>
            <Button className="text-blue-600 bg-white hover:bg-white">Edit</Button>
          </div>
          <ImagesCarousel />
        </DetailsCard>
      </DetailsRight>
    </DetailsContainer>
  );
};