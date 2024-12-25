'use client';

import React from 'react';
import { DetailsCard, DetailsContainer, DetailsLeft, DetailsRight } from './assets';
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
          <RoomDetailsUpcomingBookings />
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
