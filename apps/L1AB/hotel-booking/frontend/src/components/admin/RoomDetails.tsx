'use client';

import React from 'react';
import { DetailsCard, DetailsContainer, DetailsLeft, DetailsRight } from './assets';

const mockBookings = [
  { _id: 1, guestName: 'John Doe', status: 'Confirmed', date: '2024-12-15' },
  { _id: 2, guestName: 'Jane Smith', status: 'Pending', date: '2024-12-20' },
  { _id: 3, guestName: 'Emily White', status: 'Confirmed', date: '2024-12-25' },
  { _id: 4, guestName: 'Michael Brown', status: 'Cancelled', date: '2025-01-05' },
];

import { RoomDetailsGeneralInfo, RoomDetailsRoomServices, RoomDetailsUpcomingBookings } from './assets/room-details';
import { HotelDetailsImages } from './assets/hotel-details';
import { useAdmin } from '../providers/AdminProvider';

export const RoomDetails = () => {
  const { addRoomForm } = useAdmin();
  return (
    <DetailsContainer name={addRoomForm.values.name || 'New Room'}>
      <DetailsLeft>
        <DetailsCard>
          <RoomDetailsGeneralInfo />
        </DetailsCard>
        <DetailsCard>
          <RoomDetailsUpcomingBookings mockBookings={mockBookings} />
        </DetailsCard>
        <DetailsCard>
          <RoomDetailsRoomServices />
        </DetailsCard>
      </DetailsLeft>
      <DetailsRight>
        <DetailsCard>
          <HotelDetailsImages images={addRoomForm.values.photos || []} />
        </DetailsCard>
      </DetailsRight>
    </DetailsContainer>
  );
};
