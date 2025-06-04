import React from 'react';
import { BookingCard } from './BookingCard';
import { History } from 'lucide-react';
import { Booking } from '@/generated';

export const PastBooking = ({
  formatDateTime,
  formatNights,
  bookingsData,
}: {
  formatDateTime: (_isoDate: string) => string;
  formatNights: (_checkInDate: string, _checkOutDate: string) => number;
  bookingsData: Booking[];
}) => {
  return (
    <div className="flex flex-col gap-4 items-start max-w-[900px] w-full">
      <h3 className="text-[24px] font-[600] leading-[32px]  ">Previous Booking</h3>
      {bookingsData && bookingsData.length > 0 ? (
        <>
          <BookingCard formatDateTime={formatDateTime} formatNights={formatNights} bookingsData={bookingsData} />
        </>
      ) : (
        <div className="w-full flex flex-col justify-center items-center gap-4">
          <History className="w-6 h-6 text-muted-foreground" />
          <div>
            <p className="text-foreground text-[14px] font-[500] leading-[20px] text-center">No previous bookings.</p>
            <p className="text-muted-foreground text-[14px] font-[400] leading-[20px]">Your past stays will appear here once completed.</p>
          </div>
        </div>
      )}
    </div>
  );
};
