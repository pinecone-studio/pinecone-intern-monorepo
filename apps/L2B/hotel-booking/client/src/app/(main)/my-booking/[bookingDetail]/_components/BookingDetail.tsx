import React from 'react';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Booking } from '@/generated';

export const BookingDetail = ({ booking, checkIn, checkOut }: { booking: Booking | null | undefined; checkIn: { date: string; time: string }; checkOut: { date: string; time: string } }) => {
  return (
    <div className="max-w-6xl mx-auto">
      <Link href="/my-booking">
        <Button variant="outline" className="mb-6 border">
          <ArrowLeft className="h-4 w-4" />
        </Button>
      </Link>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-6 border p-6 rounded-md">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">{booking?.hotelId?.name}</h1>
            <Badge className={booking?.status === 'cancelled' ? 'bg-[#E11D48] text-white hover:bg-[#E11D48]' : 'bg-[#18BA51] hover:bg-[#18BA51] text-white'}>{booking?.status}</Badge>
          </div>

          <div className="flex justify-between gap-4">
            <div className="">
              <div className="text-sm font-[400] text-muted-foreground mb-1">Check in</div>
              <div className="text-[16px] font-[400] leading-[24px] ">
                {checkIn.date}, {checkIn.time}
              </div>
            </div>
            <div className="border-l"></div>
            <div className="">
              <div className="text-sm font-[400] text-muted-foreground mb-1">Check out</div>
              <div className="text-[16px] font-[400] leading-[24px] ">
                {checkOut.date}, {checkOut.time}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Link href="#" className="text-blue-600 text-[14px] font-[500] leading-[24px] hover:underline block">
              Check-in and special instructions
            </Link>
            <Link href="#" className="text-blue-600 text-[14px] font-[500] leading-[24px] hover:underline block">
              View pricing details
            </Link>
          </div>

          {booking?.status === 'booked' ? (
            <div className="text-center py-4">
              <Button variant="outline" className="w-full mb-4 border">
                Contact property
              </Button>
              <Link href={`/my-booking/${booking?._id}/${booking._id}`} className="w-full">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Cancel booking</Button>
              </Link>
            </div>
          ) : null}

          <div className="pt-10 pb-6 border-t">
            <h3 className="text-sm font-[400] text-muted-foreground mb-2">Room detail</h3>
            <h4 className="text-xl font-semibold mb-4">{booking?.roomId?.type}</h4>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-[400] text-muted-foreground">Reserved for</div>
                <h4 className="font-[400] text-[14px] leading-[24px]">
                  {booking?.userId?.firstName} {booking?.userId?.lastName}, {booking?.guests?.adults} adult, {booking?.guests?.children} child
                </h4>
              </div>
              <div>
                <div className="text-sm font-[400] text-muted-foreground">Request</div>
                <div className="font-medium">Non-Smoking</div>
              </div>
            </div>

            <Button variant={'outline'} className="border w-full mt-5">
              View rules & restrictions
            </Button>
          </div>

          <div className="pt-10 border-t">
            <h3 className="text-xl font-semibold mb-2">Pedia support</h3>
            <p className="text-sm font-[400] text-muted-foreground mb-4">Contact Pedia if you need help managing this itinerary</p>

            <div className="space-y-5">
              <div className="flex flex-col">
                <span className="text-sm font-[400] text-muted-foreground ">Itinerary: </span>
                <span className="text-[16px] font-[400] leading-[24px] ">72055771948934</span>
              </div>

              <Button variant={'outline'} className="w-full border ">
                Call +976 {booking?.hotelId?.phone}
              </Button>
            </div>
          </div>
        </div>

        <div className=" max-w-[480px] w-full">
          <div className="relative h-[216px] rounded-t-lg overflow-hidden">
            <Image src={booking?.hotelId?.images?.[0] || '/placeholder.svg'} alt="Hotel room" fill className="object-cover" />
          </div>

          <div className="p-6 border rounded-b-md">
            <h3 className="text-xl font-semibold mb-2">{booking?.hotelId?.name}</h3>
            <p className="text-gray-600 mb-4">{booking?.hotelId?.location}</p>

            <div className="flex items-center gap-2 mb-4 border-b pb-6">
              <Badge className="bg-blue-600 text-white">{booking?.hotelId?.rating}</Badge>
            </div>

            <Button variant="outline" className="w-full border mt-2">
              View in Google Maps
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
