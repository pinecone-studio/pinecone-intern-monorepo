import { GetBookingByIdQuery, useGetHotelByIdQuery } from '@/generated';
import Image from 'next/image';

interface HotelInfoProps {
  bookingByIdData: GetBookingByIdQuery | undefined;
}

export const HotelInfo = ({ bookingByIdData }: HotelInfoProps) => {
  const { data: hotelGetData } = useGetHotelByIdQuery({ variables: { getHotelByIdId: bookingByIdData?.getBookingById?.hotelId || '' } });
  return (
    <div className="max-w-[480px] w-full border border-[#E4E4E7] rounded-[6px] flex flex-col overflow-hidden">
      <div className="w-full h-[216px]">
        <Image
          src={hotelGetData?.getHotelById?.images[0] || 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/b0/b9/d0/cheap-hotels.jpg?w=1200&h=-1&s=1'}
          alt="room"
          width={478}
          height={216}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="p-4 flex flex-col gap-2">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-[#09090B] font-Inter text-base font-bold">{hotelGetData?.getHotelById?.name}</p>
            <p className="text-[#71717A] font-Inter text-sm font-normal">{hotelGetData?.getHotelById?.locationName}</p>
          </div>
          <div className="flex gap-2 items-center">
            <p className="px-[10px] py-[2px] bg-[#2563EB] rounded-full text-[#FAFAFA] font-Inter text-xs font-semibold">{hotelGetData?.getHotelById?.rating}</p>
            <p className="text-[#09090B] font-Inter text-sm font-medium">Excellent</p>
          </div>
        </div>
      </div>
    </div>
  );
};
