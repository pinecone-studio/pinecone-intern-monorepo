import React from 'react';
import { DetailsCard, DetailsContainer, DetailsLeft, DetailsRight } from './assets';
import { HotelDetailsAboutThisProperty, HotelDetailsFrequently, HotelDetailsPolicies, HotelDetailsPolicies2 } from './assets/hotel-details';

import { HotelDetailsUpcomingBookings } from './assets/hotel-details/HotelDetailsUpcomingBookings';
import { HotelDetailsRoomTypes } from './assets/hotel-details/HotelDetailsRoomTypes';
import { HotelDetailsGeneralInfo } from './assets/hotel-details/HotelDetailsGeneralInfo';
import { HotelDetailsAmenities } from './assets/hotel-details/HotelDetailsAmenities';
import { HotelDetailsLocation } from './assets/hotel-details/HotelDetailsLocation';
export const HotelDetails = () => {
  return (
    <DetailsContainer name={'Flower Hotel Ulaanbaatar'}>
      <DetailsLeft>
        <DetailsCard>
          <HotelDetailsUpcomingBookings />
        </DetailsCard>
        <DetailsCard>
          <HotelDetailsRoomTypes/>
        </DetailsCard>
        <DetailsCard>
          <HotelDetailsGeneralInfo/>
        </DetailsCard>
        <DetailsCard>
         <HotelDetailsAmenities/>
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
          <HotelDetailsLocation/>
        </DetailsCard>
        <DetailsCard>
          <div>Images</div>
        </DetailsCard>
      </DetailsRight>
    </DetailsContainer>
  );
};
