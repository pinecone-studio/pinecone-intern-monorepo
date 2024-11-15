import React from 'react';
import { DetailsCard, DetailsContainer, DetailsLeft, DetailsRight } from './assets';
import { RoomServicesDialog } from './dialogs/RoomServicesDialog';
import { GeneralInfoDialog } from './dialogs';
import { DetailsUpcomingBookings } from './assets/DetailsUpcomingBookings';

export const RoomDetails = () => {
  return (
    <DetailsContainer name={'Flower Hotel Ulaanbaatar'}>
      <DetailsLeft>
        <DetailsCard>
          <div>General Info</div>
          <GeneralInfoDialog/>
        </DetailsCard>
        <DetailsCard>
          <DetailsUpcomingBookings/>
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
