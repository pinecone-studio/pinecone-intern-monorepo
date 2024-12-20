import React from 'react';
import { Container, ViewRulesDialog } from './assets';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BookingDetailRoom } from './BookingDetailRoom';
import { Booking } from '@/generated';
import { BookedComponent } from './BookedComponent';

type BookingDetailsType = {
  data: Booking;
};

export const BookingDetails = ({ data }: BookingDetailsType) => {
  console.log(data, 'data=== FROM BOOKINGDETAILS component');

  return (
    <Container backgroundColor="bg-white">
      <Link href="/bookings">
        <Button variant="outline" size="icon">
          <ChevronLeft className="bg-gray-200 rounded-md" />
        </Button>
      </Link>
      <div className="flex gap-6 p-4">
        <div className="flex flex-col w-full border border-[#E4E4E7] p-8 rounded-xl">
          <BookedComponent data={data} />
          <div className="flex flex-col gap-4">
            <div className="text-[#71717A] text-sm">Room detail</div>
            <div className="font-semibold ">
              <h4>{data?.roomId.name}, 1 King Bed</h4>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-col gap-5">
                <div className="flex gap-10 text-sm text-[#71717A]">
                  <h1 className="">Reserved for</h1>
                  <h1>Request</h1>
                </div>
                <div className="flex gap-10">
                  <h1>
                    {data?.firstName} {data?.lastName}, {data?.traveller} adult
                  </h1>
                  <h1>Non-Smoking</h1>
                </div>
              </div>
              <div className="w-full  items-center flex">
                <div className="flex w-full   border border-[#E4E4E7] rounded-xl mt-4">
                  <ViewRulesDialog />
                </div>
              </div>
              <div className="border border-[#E4E4E7] my-5 mt-10"></div>
            </div>
          </div>
          <div className="flex flex-col gap-3 p-3">
            <h4 className="font-bold">Pedia support</h4>
            <h3 className="text-[#71717A] text-sm">Contact Pedia if you need help managing this Itinerary</h3>
            <div className="flex flex-col gap-2">
              <h3 className="text-[#71717A]">Itinerary:</h3>
              <h3>72055771948934</h3>
            </div>
            <Button variant="outline" className="border border-[#E4E4E7] rounded-xl">
              Call +976 {data?.phoneNumber}
            </Button>
          </div>
        </div>
        <div className="flex flex-col w-[480px] ">
          <BookingDetailRoom
            hotelDetailName={data?.roomId.hotelId.name}
            hotelDetailLocation={data?.roomId.hotelId.address}
            HotelDetailPhone={data?.roomId.hotelId.phone}
            photos={data?.roomId.photos ?? []}
            rating={data?.roomId.hotelId.rating}
          />
        </div>
      </div>
    </Container>
  );
};
