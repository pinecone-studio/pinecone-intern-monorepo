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
import { useAdmin } from '../providers/AdminProvider';

export const HotelDetails = () => {
  const { addHotelForm } = useAdmin();
  return (
    <DetailsContainer name={addHotelForm.values.name || 'New Hotel'}>
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
          <HotelDetailsImages images={addHotelForm.values.images} />
        </DetailsCard>
      </DetailsRight>
    </DetailsContainer>
  );
};
