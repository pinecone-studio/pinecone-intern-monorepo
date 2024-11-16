import React from 'react';
import { DetailsCard, DetailsContainer, DetailsLeft, DetailsRight } from './assets';
import { RoomServicesDialog } from './dialogs/RoomServicesDialog';

export const RoomDetails = () => {
  return (
    <DetailsContainer name={'Flower Hotel Ulaanbaatar'}>
      <DetailsLeft>
        <DetailsCard>
          <div>General Info</div>
        </DetailsCard>
        <DetailsCard>
          <div>Upcoming Bookings</div>
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
