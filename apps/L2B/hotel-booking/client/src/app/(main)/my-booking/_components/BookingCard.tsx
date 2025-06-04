import { Button } from '@/components/ui/button';
import { Booking } from '@/generated';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { RoomInfo } from './RoomInfo';

export const BookingCard = ({
  bookingsData,
  formatDateTime,
  formatNights,
}: {
  bookingsData: Booking[];
  formatDateTime: (_isoDate: string) => string;
  formatNights: (_checkInDate: string, _checkOutDate: string) => number;
}) => {
  return (
    <div className="w-full flex flex-col gap-4">
      {bookingsData?.map((bookingData) => {
        return (
          <div key={bookingData._id} className="w-full h-[222px] border rounded-md flex justify-center items-start ">
            <div className="basis-[395px] shrink-0 ">
              <Image width={395} height={200} alt="" src={bookingData?.roomId?.images?.[0] ?? '/placeholder.jpg'} className="aspect-video bg-center " />
            </div>
            <div className="flex-1 p-5 flex w-full h-full flex-col justify-between items-start ">
              <RoomInfo bookingData={bookingData} formatNights={formatNights} />
              <div className="w-full flex gap-4 items-end ">
                <div className="w-full flex flex-col gap-2 items-start ">
                  <div className="flex w-full ">
                    <h4 className="text-[14px] font-[400] leading-[20px] text-muted-foreground mr-2">Check in:</h4>
                    <h4 className="text-[14px] font-[500] leading-[20px] ">{formatDateTime(bookingData.checkInDate)}</h4>
                  </div>
                  <div className="flex w-full">
                    <h4 className="text-[14px] font-[400] leading-[20px] text-muted-foreground mr-2">Itinerary:</h4>
                    <h4 className="text-[14px] font-[500] leading-[20px] ">72055771948934</h4>
                  </div>
                </div>

                <Link href={`/my-booking/${bookingData._id}`}>
                  <Button variant={'outline'} className="border ">
                    View Detail
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
