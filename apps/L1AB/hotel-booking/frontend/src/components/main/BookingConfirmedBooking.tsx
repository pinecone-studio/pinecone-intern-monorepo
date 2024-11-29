'use client';
import { Container } from './assets';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const BookingConfirmedBooking = () => {
  return (
    <Container backgroundColor="bg-white">
      <div className="bg-pink-100 w-[960px] flex flex-col p-3">
        <div className="bg-green-50">
          Confirmed Booking
          <div className="flex">
            <div className="flex flex-1 bg-blue-100 w-72 h-56">Image</div>
            <div className="flex flex-1 flex-col p-3">
              <div className="flex flex-col mt-3 gap-1 mb-12">
                <div>
                  <Button asChild className="bg-[#18BA51]">
                    <Link href="/login">Booked</Link>
                  </Button>
                </div>
                <h1 className="font-bold"> Flower Hotel Ulaanbaatar</h1>
                <p className="text-[#71717A] text-sm">Standard Room, City View, 1 Queen Bed</p>
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
      </div>
      <div className="border bg-yellow-50">Previous Booking</div>
    </Container>
  );
};
