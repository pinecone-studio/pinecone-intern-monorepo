import React from 'react';
import { BookingCard } from './BookingCard';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Booking } from '@/generated';
import Link from 'next/link';
import { UserType } from '@/utils/type';

export const UpcomingBooking = ({
  formatDateTime,
  formatNights,
  bookingsData,
  user,
}: {
  formatDateTime: (_isoDate: string) => string;
  formatNights: (_checkInDate: string, _checkOutDate: string) => number;
  bookingsData: Booking[];
  user: UserType | null;
}) => {
  return (
    <div className="flex flex-col gap-4 items-start max-w-[900px] w-full ">
      <h3 className="text-[24px] font-[600] leading-[32px]  ">Confirmed Booking</h3>
      {bookingsData && bookingsData.length > 0 ? (
        <BookingCard formatDateTime={formatDateTime} formatNights={formatNights} bookingsData={bookingsData} />
      ) : (
        <div className="w-full flex flex-col justify-center items-center gap-4 ">
          <Image alt="" src={'/Frame.svg'} width={140} height={140} />
          <p className="text-[14px] font-[500] leading-[20px] text-center ">
            {user?.firstName}, you have no upcoming trips. <br /> Where are you going next?
          </p>
          <Link href={'/'}>
            <Button className="bg-[#2563EB] hover:bg-[#2564ebdc] ">Start Exploring</Button>
          </Link>
        </div>
      )}
    </div>
  );
};
