'use client';

import { LeftArrow } from '@/components/admin/svg';
import { HotelInfo } from '@/features/user/booking-detail/HotelInfo';
import { Reservation } from '@/features/user/booking-detail/Reservation';
import { LogoIcon } from '@/components/user/ui/svg';
import Image from 'next/image';
import Link from 'next/link';
import { NavigationWhiteDown } from './main/NavigationWhiteDown';
import { useGetBookingByIdQuery } from '@/generated';

interface BookingDetailPageProps {
  idParams?: string;
}

export const BookingDetailPage = ({ idParams }: BookingDetailPageProps) => {
  const { data: bookingByIdData } = useGetBookingByIdQuery({ variables: { getBookingByIdId: idParams || '' } });

  console.log(bookingByIdData, 'bookingByIdData');

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div className="bg-[#FFFFFF] h-[64px]">
        <div className="container mx-auto h-full flex items-center justify-between">
          <Link href={'/'}>
            <Image src="/LogoWhite.png" alt="Logo" width={86} height={20} />
          </Link>
          <div className="flex gap-4">
            <Link href={'/booking'}>
              <div className="py-2 px-4">
                <p className="font-normal font-Inter text-sm text-[#09090B]">My Booking</p>
              </div>
            </Link>
            <NavigationWhiteDown />
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="p-8 flex flex-col gap-6 max-w-[1280px] w-full">
          <Link
            href="/booking"
            className="w-8 h-8 flex items-center justify-center rounded-[10px] border border-[#E4E4E7] bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] hover:bg-[#FAFAFA] duration-200"
          >
            <LeftArrow />
          </Link>
          <div className="flex gap-6 justify-center">
            <Reservation idParams={idParams} bookingByIdData={bookingByIdData} />
            <div className="max-w-[480px] w-full">
              <HotelInfo bookingByIdData={bookingByIdData} />
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto flex items-start w-full pb-10 py-2 mt-auto">
        <LogoIcon />
      </div>
    </div>
  );
};
