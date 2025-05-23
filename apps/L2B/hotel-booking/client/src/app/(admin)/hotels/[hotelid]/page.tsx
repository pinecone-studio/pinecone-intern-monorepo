'use client';
import { RoomsByHotel } from './_features/RoomsByHotel';
import { UpcomingBookings } from './_feature/UpcomingBookings';

const hotelPage = () => {
  return (
    <div className="w-full">
      <UpcomingBookings />
      <RoomsByHotel />
    </div>
  );
};

export default hotelPage;
