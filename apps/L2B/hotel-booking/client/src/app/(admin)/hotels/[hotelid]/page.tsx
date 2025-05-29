'use client';

import { useHotelQuery } from '@/generated';
import { ChevronLeft, PanelLeft } from 'lucide-react';
import Link from 'next/link';
import { RoomsByHotel } from './_features/RoomsByHotel';
import { HotelAmenities } from './_features/HotelAmenities';
import { HotelGeneralInfo } from './_features/HotelGeneralInfo';
import { HotelImage } from './_features/HotelImages';
import { HotelLocation } from './_features/HotelLocation';
import { UpcomingBookings } from './_feature/UpcomingBookings';
import { useRouter } from 'next/navigation';

const HotelPage = ({ params }: { params: { hotelid: string } }) => {
  const { data, error, refetch } = useHotelQuery({
    variables: { hotelId: params.hotelid },
    skip: !params.hotelid,
  });

  const router = useRouter();
  const hotel = data?.hotel;

  if (error || !hotel) return <div>loading...</div>;

  return (
    <main className="w-full h-full pb-6 bg-[#e4e4e768]">
      <div className="flex items-center gap-2 w-full p-6 text-sm text-gray-500 border-b">
        <PanelLeft />
        <Link href="/hotels" className="hover:text-blue-600 text-black text-md">
          Hotels
        </Link>
        <span>&gt;</span>
        <div className="hover:text-blue-600 hover:cursor-pointer">Hotel Detail</div>
      </div>
      <div className="w-[95%] mx-auto mt-4 flex gap-4">
        <div onClick={() => router.push('/hotels')} className="w-8 h-8 hover:cursor-pointer bg-white rounded-lg border-[#E4E4E7] flex items-center justify-center">
          <ChevronLeft width={16} height={16} />
        </div>
        <h2 className="text-lg font-semibold ">{hotel.name}</h2>
      </div>
      <div className="w-[95%] mx-auto mt-4 min-h-full flex gap-5">
        <div className="flex flex-col gap-4">
          <UpcomingBookings hotelId={params.hotelid} />
          <RoomsByHotel hotelId={params.hotelid} />
          <HotelAmenities hotel={{ _id: hotel._id!, amenities: hotel.amenities || [] }} refetch={refetch} />
          <HotelGeneralInfo hotel={hotel} />
        </div>
        <div className="flex flex-col gap-4">
          <HotelLocation hotel={{ _id: hotel._id!, location: hotel.location || '' }} refetch={refetch} />
          <HotelImage hotel={{ _id: hotel._id!, images: hotel.images }} />
        </div>
      </div>
    </main>
  );
};

export default HotelPage;
