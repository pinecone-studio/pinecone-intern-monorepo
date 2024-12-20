'use client';

import { CheckingBookingRight } from './assets/CheckingBookingRight';
import { CheckingBookingLeft } from './assets/CheckingBookingLeft';
import { Booking } from '@/generated';
type CheckOutHomeType = {
  data: Booking;
};
export const CheckOutHome = ({ data }: CheckOutHomeType) => {
  return (
    <div className="w-full p-3">
      <div className=" flex justify-center "></div>
      <div className="flex justify-center p-3">
        <div className="w-full p-3  flex flex-row gap-5 justify-center ">
          <CheckingBookingLeft />
          <div className="w-[515px] h-[843px] bg-green-100 ">
            <CheckingBookingRight />
          </div>
        </div>
      </div>
    </div>
  );
};
