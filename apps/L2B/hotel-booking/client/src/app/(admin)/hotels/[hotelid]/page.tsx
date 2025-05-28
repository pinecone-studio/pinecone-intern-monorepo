'use client';
import { PanelLeft } from 'lucide-react';
import { RoomsByHotel } from './_features/RoomsByHotel';
import { HotelAmenities } from './_features/HotelAmenities';
import { HotelGeneralInfo } from './_features/HotelGeneralInfo';
import { HotelImage } from './_features/HotelImages';
import { HotelLocation } from './_features/HotelLocation';
import Link from 'next/link';
const HotelPage = ({ params }: { params: { hotelid: string } }) => {
  return (
    <div className="p-6">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <PanelLeft />
        <Link href="/hotels" className="hover:text-blue-600 text-black text-md">
          Hotels
        </Link>
        <span>&gt;</span>
        <div className="hover:text-blue-600">Hotel Detail</div>
      </div>
      <main className="w-full min-h-full bg-[#e4e4e768] flex gap-5">
        <div>
          <RoomsByHotel hotelId={params.hotelid} />
          <HotelAmenities />
          <HotelGeneralInfo />
        </div>
        <div>
          <HotelLocation />
          <HotelImage />
        </div>
      </main>
    </div>
  );
};
export default HotelPage;
