import React from 'react';
import { DetailsCard, DetailsContainer, DetailsLeft, DetailsRight } from './assets';

export const GuestInfo = () => {
  return (
    <DetailsContainer name={'Shagai Nyamdorj'}>
      <DetailsLeft>
        <DetailsCard>
          <div>Guest Info</div>
        </DetailsCard>
      </DetailsLeft>
      <DetailsRight>
        <DetailsCard>
          <div>Economy Single Room</div>
        </DetailsCard>
        <DetailsCard>
          <div>Price Detail</div>
        </DetailsCard>
      </DetailsRight>
    </DetailsContainer>
  );
};
