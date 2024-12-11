'use client';

import React from 'react';
import { DetailsCard, DetailsContainer, DetailsLeft, DetailsRight } from './assets';

const mockBookings = [
  { _id: 1, guestName: 'John Doe', status: 'Confirmed', date: '2024-12-15' },
  { _id: 2, guestName: 'Jane Smith', status: 'Pending', date: '2024-12-20' },
  { _id: 3, guestName: 'Emily White', status: 'Confirmed', date: '2024-12-25' },
  { _id: 4, guestName: 'Michael Brown', status: 'Cancelled', date: '2025-01-05' },
];
import { useGetRoomByIdQuery } from '@/generated';
import { useParams } from 'next/navigation';
import { RoomDetailsGeneralInfo, RoomDetailsRoomServices, RoomDetailsUpcomingBookings } from './assets/room-details';
import { HotelDetailsImages } from './assets/hotel-details';

export const RoomDetails = () => {
  const { room } = useParams();
  const { data } = useGetRoomByIdQuery({ variables: { id: room as string } });
  const RoomDetails = data?.getRoomById[0];
  return (
    <DetailsContainer>
      <DetailsLeft>
        <DetailsCard>
          <RoomDetailsGeneralInfo name={RoomDetails?.name} type={RoomDetails?.roomType} price={RoomDetails?.price} />
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
          <HotelDetailsImages images={RoomDetails?.photos as string[]} />
        </DetailsCard>
      </DetailsRight>
    </DetailsContainer>
  );
};
