import React from 'react'
import { DetailsCard, DetailsContainer, DetailsLeft, DetailsRight } from './assets';
import { AmenityDialog } from './dialogs/AmenityDialog';

export const HotelDetails = () => {
  return (
    <DetailsContainer name={'Flower Hotel Ulaanbaatar'}>
      <DetailsLeft>
        <DetailsCard>
          <div>Upcoming Bookings</div>
        </DetailsCard>
        <DetailsCard>
          <div>Room Types</div>
        </DetailsCard>
        <DetailsCard>
          <div>General Info</div>
        </DetailsCard>
        <DetailsCard>
          <div>Amenities</div>
          <AmenityDialog />
        </DetailsCard>
        <DetailsCard>
          <div>About this property</div>
        </DetailsCard>
        <DetailsCard>
          <div>Policies</div>
        </DetailsCard>
        <DetailsCard>
          <div>Policies</div>
        </DetailsCard>
        <DetailsCard>
          <div>Frequently asked questions</div>
        </DetailsCard>
      </DetailsLeft>
      <DetailsRight>
        <DetailsCard>
          <div>Location</div>
        </DetailsCard>
        <DetailsCard>
          <div>Images</div>
        </DetailsCard>
      </DetailsRight>
    </DetailsContainer>
  );
};
