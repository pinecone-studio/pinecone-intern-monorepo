import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

type BookingDetailRoomType = {
  hotelDetailName: string;
  hotelDetailLocation: string;
  HotelDetailPhone: string;
  photos: string[];
  rating: number;
};

export const BookingDetailRoom = ({ hotelDetailName, hotelDetailLocation, HotelDetailPhone, photos, rating }: BookingDetailRoomType) => {
  return (
    <div className="border border-[#E4E4E7] p-3 rounded-xl">
      <div>
        <div className="bg-pink-100">
          <Image src={photos && photos.length > 0 ? photos[0] : '/path/to/default-image.jpg'} alt="img" width={395} height={222} className="rounded-xl " />
        </div>
      </div>
      <div className="flex flex-col mt-3 gap-3 ">
        <h1 className="font-bold">{hotelDetailName}</h1>
        <p className="text-[#71717A] text-sm">
          {hotelDetailLocation}* + 976 - {HotelDetailPhone}
        </p>
      </div>
      <div className="flex flex-row gap-1 mt-3">
        <button className="w-[39px] h-[20px] border rounded-3xl bg-blue-600 text-white flex justify-center items-center text-sm">{rating}</button>
        <h3>Excellent</h3>
      </div>
      <div className="border border-[#E4E4E7] mt-5 "></div>
      <div className="mt-3">
        <Link href="https://www.google.com/maps">
          <Button className="w-full border border-[#E4E4E7] rounded-xl" variant="outline">
            View in Google Maps
          </Button>
        </Link>
      </div>
    </div>
  );
};
