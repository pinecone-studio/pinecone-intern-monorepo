import { Badge } from '@/components/ui/badge';
import { Booking } from '@/generated';
import React from 'react';

export const RoomInfo = ({ bookingData, formatNights }: { bookingData: Booking; formatNights: (_checkInDate: string, _checkOutDate: string) => number }) => {
  return (
    <div className="flex w-full flex-col items-start gap-3 ">
      <div className="flex w-full flex-col items-start ">
        <div className="w-full flex flex-col gap-1 items-start ">
          <Badge className={bookingData.status === 'cancelled' ? 'bg-[#E11D48]' : 'bg-[#18BA51]'}>{bookingData.status}</Badge>
          <h4 className="text-[16px] font-[700] leading-[28px] ">{bookingData?.hotelId?.name}</h4>
        </div>
        <p className="text-[14px] w-full font-[400] leading-[20px] text-muted-foreground ">
          {bookingData.roomId.information?.map((info, index) => (
            <span key={index} className="text-[14px] font-[400] leading-[20px] text-muted-foreground ">
              {info}
              {info !== bookingData.roomId.information?.[bookingData.roomId.information.length - 1] ? ', ' : ''}
            </span>
          ))}
        </p>
      </div>
      <div className="w-full text-[14px] font-[500] leading-[20px]">
        <small>{formatNights(bookingData.checkInDate, bookingData.checkOutDate)} night</small> •{' '}
        <small>
          {bookingData.guests.adults} adult{bookingData.guests.adults > 1 ? 's' : ''}
          {bookingData.guests.children > 0 ? `, ${bookingData.guests.children} child${bookingData.guests.children > 1 ? 'ren' : ''}` : ''}
        </small>{' '}
        • <small>1 room</small>
      </div>
    </div>
  );
};
