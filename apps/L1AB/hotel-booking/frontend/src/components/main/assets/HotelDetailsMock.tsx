import React from 'react';
import { HotelDetailsMock1 } from './HotelDetailsMock1';
import { HotelDetailsMock2 } from './HotelDetailsMock2';
import { HotelDetailsMock3 } from './HotelDetailsMock3';
import { HotelDetailsMock4 } from './HotelDetailsMock4';

export const HotelDetailsMock = () => {
  return (
    <div className="w-full flex flex-col">
      <HotelDetailsMock1 />
      <div className="border-t-[1px] border-border my-4"></div>
      <HotelDetailsMock2 />
      <div className="border-t-[1px] border-border my-4"></div>
      <HotelDetailsMock3 />
      <div className="border-t-[1px] border-border my-4"></div>
      <HotelDetailsMock4 />
    </div>
  );
};
