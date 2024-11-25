import React from 'react';
import { DetailsCard, DetailsContainer, DetailsLeft, DetailsRight } from './assets';
import { RoomServicesDialog } from './dialogs/RoomServicesDialog';
import { GeneralInfoDialog } from './dialogs';
import { DetailsUpcomingBookings } from './assets/DetailsUpcomingBookings';

const mockBookings = [
  { _id: 1, guestName: 'John Doe', status: 'Confirmed', date: '2024-12-15' },
  { _id: 2, guestName: 'Jane Smith', status: 'Pending', date: '2024-12-20' },
  { _id: 3, guestName: 'Emily White', status: 'Confirmed', date: '2024-12-25' },
  { _id: 4, guestName: 'Michael Brown', status: 'Cancelled', date: '2025-01-05' },
];

export const RoomDetails = () => {
  return (
    <DetailsContainer name={'Flower Hotel Ulaanbaatar'}>
      <DetailsLeft>
        <DetailsCard>
          <div>General Info</div>
          <GeneralInfoDialog/>
        </DetailsCard>
        <DetailsCard>
          <DetailsUpcomingBookings mockBookings={mockBookings}/>
        </DetailsCard>
        <DetailsCard>
          <div>Room Services</div>
          <RoomServicesDialog />
        </DetailsCard>
      </DetailsLeft>
      <DetailsRight>
        <DetailsCard>
          <div>Images</div>
        </DetailsCard>
      </DetailsRight>
    </DetailsContainer>
  );
};
