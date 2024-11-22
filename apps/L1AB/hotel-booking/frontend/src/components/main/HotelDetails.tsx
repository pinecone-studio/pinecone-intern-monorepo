import React from 'react';
import { Container } from './assets';
import { HotelDetailsMock } from './assets/HotelDetailsMock';

export const HotelDetails = () => {
  return (
    <Container backgroundColor="bg-white ">
      <div className="px-[60px] py-8 space-y-8">
        <div>images</div>
        <div className="space-y-14">
          <div>Details</div>
          <div>Choose your room</div>
          <HotelDetailsMock />
        </div>
      </div>
    </Container>
  );
};
