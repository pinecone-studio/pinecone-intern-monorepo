import { format, differenceInDays } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
Link;
type BookingCardType = {
  hotelName: string;
  description: string;
  checkIn: string;
  checkOut: string;
  status: string;
  traveller: number;
  roomType: string;
  photos: string[];
};

export const BookingCard = ({ hotelName, description, checkIn, status, traveller, roomType, photos, checkOut }: BookingCardType) => {
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);

  const nights = differenceInDays(checkOutDate, checkInDate);
  const formattedCheckIn = format(checkInDate, 'eeee, MMMM d, h:mm a');

  return (
    <div className="w-full border flex  rounded-xl" data-testid="bookingCardMOCKshu">
      <div className="flex borde rounded-xl">
        <div className="">
          <Image src={photos[0]} alt="img" width={395} height={222} className="rounded-xl " />
        </div>
      </div>
      <div className="p-2 w-[501px] ">
        <div className="p-3 flex flex-col gap-2">
          <button className="w-[88px] h-[24px] rounded-xl bg-[#18BA51] flex justify-center items-center text-white text-sm">{status}</button>
          <h1 className="text-xl font-bold">{hotelName}</h1>
          <h1 className="text-[#71717A]">{description}</h1>
          <h1>
            {nights} night • {traveller} adult • {roomType === 'ONE' ? '1 room' : '2 room'}
          </h1>
        </div>
        <div className="flex flex-col p-3">
          <div className="flex gap-1">
            <h1 className="text-[#71717A]">Check in: </h1>
            <h1>{formattedCheckIn}</h1>
          </div>

          <div className="flex flex-row justify-between">
            <div className="flex gap-1">
              <h1 className="text-[#71717A]">Itinerary:</h1>
              <h1>72055771948934</h1>
            </div>
            <div className="flex items-center">
              <Link href="/bookings/previousBooking">
                <button className="w-[100px] h-[36px] border rounded-xl flex justify-center items-center text-sm">View Detail</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
