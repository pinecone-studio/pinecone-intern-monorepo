import { Zap } from 'lucide-react';
import { format, differenceInDays } from 'date-fns';
import Image from 'next/image';
import { CheckingBookingRightType } from '../CheckoutHome';

const formatDate = (date: string) => {
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    return 'Invalid Date';
  }

  const formattedCheckIn = format(parsedDate, 'eeee, MMMM d, h:mm a');
  return formattedCheckIn;
};

const convertDate = (checkIn: string, checkOut: string) => {
  const checkInDate = checkIn ? new Date(checkIn) : new Date();
  const checkOutDate = checkOut ? new Date(checkOut) : new Date();

  const nights = differenceInDays(checkOutDate, checkInDate);
  return nights;
};

export const CheckingBookingRight = ({ roomData, formData }: CheckingBookingRightType) => {
  return (
    <div className="w-[515px] text-sm">
      <div className="border border-[#E4E4E7] rounded-xl">
        <Image
          src={roomData.photos && roomData.photos.length > 0 ? roomData.photos[0] : '/path/to/default-image.jpg'}
          alt="img"
          width={0}
          height={0}
          className="rounded-xl min-w-[515px] max-h-[216px] object-cover"
        />
        <div className="p-4">
          <div className="space-y-4">
            <div className="space-y-1">
              <p className="text-[16px] font-bold">{roomData.hotelId.name}</p>
              <p className="text-[#71717A] ">{roomData.hotelId.address}</p>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <div className="w-[39px] h-[20px] rounded-2xl bg-blue-600 flex justify-center items-center text-white">{roomData.hotelId.rating}</div>
              <p className="font-medium">Excellent</p>
            </div>
          </div>
          <div className="w-full h-[1px] border border-[#E4E4E7] my-4"></div>{' '}
          <div className="flex flex-col gap-4 mt-5 ">
            <div>
              <p className="text-[#71717A]">Check in</p>
              <p className="font-medium">{formatDate(formData.checkIn)}</p>
            </div>
            <div>
              <p className="text-[#71717A]">Check out</p>
              <p className="font-medium">{formatDate(formData.checkOut)}</p>
            </div>
          </div>
          <div className="w-full h-[1px] border border-[#E4E4E7] my-4"></div>
          <div className="mt-3">
            <p>{roomData.description}, City View</p>
            <div className="flex flex-wrap gap-10 mt-4">
              {roomData.roomAmenities.map((el, index) => (
                <div key={index} className="flex items-center gap-2 text-[#71717A]">
                  <Zap className="w-[18px] h-[18px]" />
                  <p>{el.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-4 mt-6 p-4 border border-[#E4E4E7] rounded-xl">
        <div>
          <p className="font-bold text-[16px]">Price Detail</p>
          <p className="mt-3">
            {roomData.description} x {convertDate(formData.checkIn, formData.checkOut)} night
          </p>
          <p className="text-[#71717A]">{roomData.price.toLocaleString()}₮ per night</p>
        </div>
        <div className="w-full h-[1px] border border-[#E4E4E7]"></div>
        <div className="flex justify-between mt-3">
          <p className="font-medium">Total Price</p>
          <p className="text-[18px]">{(roomData.price * convertDate(formData.checkIn, formData.checkOut)).toLocaleString()}₮</p>
        </div>
      </div>
    </div>
  );
};
