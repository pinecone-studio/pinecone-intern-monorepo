'use client';
import { RoomsByHotel } from './_features/RoomsByHotel';
import { HotelAmenities } from './_features/HotelAmenities';
import { HotelGeneralInfo } from './_features/HotelGeneralInfo';
import { HotelImage } from './_features/HotelImages';
import { HotelLocation } from './_features/HotelLocation';

const hotelPage = () => {
  return (
    <main className="w-full min-h-full p-5 bg-[#e4e4e768] flex gap-5">
      <div>
        <RoomsByHotel />
        <HotelAmenities />
        <HotelGeneralInfo />
      </div>
      <div>
        <HotelLocation />
        <HotelImage />
      </div>
    </main>
  );
};

export default hotelPage;
