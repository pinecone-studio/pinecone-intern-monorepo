'use client';
import { Container } from './assets';
import { Button } from '@/components/ui/button';
import { History } from 'lucide-react';
import Link from 'next/link';

export const BookingConfirmedBooking = () => {
  return (
    <Container backgroundColor="bg-white">
      <div className="w-[960px] flex flex-col p-3 m-auto">
        <h3 className="text-2xl font-semibold mb-3">Confirmed Booking</h3>
        <div className="border rounded-xl">
          <div className="flex">
            <div className="flex flex-1 bg-blue-100 w-72 h-56 rounded-xl">Image</div>
            <div className="flex flex-1 flex-col px-3">
              <div className="flex flex-col mt-3 gap-1 mb-12">
                <div>
                  <button className="w-[64px] h-[20px] bg-green-600 rounded-xl text-sm text-white ">
                    <Link href="/login">Booked</Link>
                  </button>
                </div>
                <h1 className="font-bold"> Flower Hotel Ulaanbaatar</h1>
                <p className="text-[#71717A] text-sm">Standard Room, City View, 1 Queen Bed</p>

                <ul className="flex gap-4 text-sm list-disc">1 night • 1 adult • 1 room</ul>
              </div>
              <div className="flex  justify-between">
                <div className="flex flex-col text-[#71717A] text-sm">
                  <div className="flex gap-3">
                    Check in:
                    <p className="text-black">Monday, Jul 1, 3:00pm</p>
                  </div>
                  <div className="flex gap-3">
                    Itinerary:
                    <p className="text-black">72055771948934</p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button variant="outline" className="border border-[#E4E4E7] rounded-xl">
                    View Detail
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-2xl font-semibold mb-3">Previous Booking</h3>

          <div className="flex flex-col justify-center items-center">
            <div className=" text-[#71717A] text-sm">
              <History className="w-5 h-5" />
            </div>
            <div className="text-sm font-medium text-[#09090B]">No Previous Bookings</div>
            <div className="text-sm font-normal text-[#71717A]">&quot;Your past stays will appear here once completed.&quot;</div>
          </div>
        </div>
      </div>
    </Container>
  );
};
