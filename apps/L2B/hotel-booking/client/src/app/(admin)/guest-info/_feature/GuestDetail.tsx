'use client';

import { ChevronLeft } from 'lucide-react';
import { Navbar } from '../_components/Navbar';
import { GuestInfoCard } from '../_components/GuestInfoCard';
import { RoomPriceDetail } from '../_components/RoomPriceDetail';

export interface GuestInfo {
  firstName: string;
  lastName: string;
  status: 'Booked' | 'Checked In' | 'Checked Out';
  checkIn: string;
  checkOut: string;
  email: string;
  phoneNumber: string;
  guestRequest: string;
  roomNumber: string;
  adults: number;
  children: number;
  roomType: string;
  roomImage: string;
  pricePerNight: number;
  nights: number;
  taxes: number;
  currency: string;
}

export const GuestInfoPage = () => {
  const guestInfo: GuestInfo = {
    firstName: 'Shagai',
    lastName: 'Nyamdorj',
    status: 'Booked',
    checkIn: 'Oct 20, Monday, Jul 1, 3:00pm',
    checkOut: 'Oct 21, Tuesday, Jul 3, 11:00am',
    email: 'n.shagai@pinecone.mn',
    phoneNumber: '+976 99112233',
    guestRequest: 'No Request',
    roomNumber: 'Room #502',
    adults: 1,
    children: 0,
    roomType: 'Economy Single Room',
    roomImage: '/hotel.png',
    pricePerNight: 150000,
    nights: 1,
    taxes: 12000,
    currency: '₮',
  };

  const totalPrice = guestInfo.pricePerNight * guestInfo.nights + guestInfo.taxes;

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <main className="flex-1 p-6">
        <Navbar />

        <div className="flex items-center gap-4 mb-6">
          <button className="p-2 rounded-full border">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h1 className="text-xl font-semibold">
            {guestInfo.firstName} {guestInfo.lastName}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-[1200px] mx-auto w-full">
          <GuestInfoCard guestInfo={guestInfo} />
          <RoomPriceDetail totalPrice={totalPrice} guestInfo={guestInfo} />
        </div>
      </main>
    </div>
  );
};
