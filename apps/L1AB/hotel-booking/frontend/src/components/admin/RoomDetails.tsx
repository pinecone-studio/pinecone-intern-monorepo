import React from 'react';
import { DetailsCard, DetailsContainer, DetailsLeft, DetailsRight, ImagesCarousel } from './assets';
import { RoomServicesDialog } from './dialogs/RoomServicesDialog';
import { GeneralInfoDialog } from './dialogs';
import { DetailsUpcomingBookings } from './assets/DetailsUpcomingBookings';

const mockBookings = [
  { _id: 1, guestName: 'John Doe', status: 'Confirmed', date: '2024-12-15' },
  { _id: 2, guestName: 'Jane Smith', status: 'Pending', date: '2024-12-20' },
  { _id: 3, guestName: 'Emily White', status: 'Confirmed', date: '2024-12-25' },
  { _id: 4, guestName: 'Michael Brown', status: 'Cancelled', date: '2025-01-05' },
];
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
          <DetailsUpcomingBookings mockBookings={mockBookings}/>
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