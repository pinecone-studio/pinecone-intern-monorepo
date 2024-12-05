'use client';

import React from 'react';
import { DetailsCard, DetailsContainer, DetailsLeft, DetailsRight } from './assets';
import {
  HotelDetailsAboutThisProperty,
  HotelDetailsAmenities,
  HotelDetailsFrequently,
  HotelDetailsGeneralInfo,
  HotelDetailsImages,
  HotelDetailsLocation,
  HotelDetailsPolicies,
  HotelDetailsPolicies2,
  HotelDetailsRoomTypes,
  HotelDetailsUpcomingBookings,
} from './assets/hotel-details';
import { useParams } from 'next/navigation';
import { useGetHotelByIdQuery } from '@/generated';
export const HotelDetails = () => {
  const { hotel } = useParams();
  const { data } = useGetHotelByIdQuery({ variables: { id: hotel as string } });
  const hotelDetails = data?.getHotelById;
  return (
    <DetailsContainer name={hotelDetails?.name || 'New Hotel'}>
      <DetailsLeft>
        <DetailsCard>
          <HotelDetailsUpcomingBookings />
        </DetailsCard>
        <DetailsCard>
          <HotelDetailsRoomTypes />
        </DetailsCard>
        <DetailsCard>
          <HotelDetailsGeneralInfo />
        </DetailsCard>
        <DetailsCard>
          <HotelDetailsAmenities />
        </DetailsCard>
        <DetailsCard>
          <HotelDetailsAboutThisProperty />
        </DetailsCard>
        <DetailsCard>
          <HotelDetailsPolicies />
        </DetailsCard>
        <DetailsCard>
          <HotelDetailsPolicies2 />
        </DetailsCard>
        <DetailsCard>
          <HotelDetailsFrequently />
        </DetailsCard>
      </DetailsLeft>
      <DetailsRight>
        <DetailsCard>
          <HotelDetailsLocation />
        </DetailsCard>
        <DetailsCard>
          <HotelDetailsImages images={hotelDetails?.images} />
        </DetailsCard>
      </DetailsRight>
    </DetailsContainer>
  );
};
