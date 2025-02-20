import { LeftArrow } from '@/components/admin/svg';
import { HotelInfo } from '@/components/user/booking-detail/HotelInfo';
import { Reservation } from '@/components/user/booking-detail/Reservation';
// import { NavigationWhite } from '@/components/user/main/NavigationWhite';
import { LogoIcon } from '@/components/user/ui/svg';
import Link from 'next/link';

export const BookingDetailPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* <NavigationWhite /> */}
      <div className="flex justify-center">
        <div className="p-8 flex flex-col gap-6 max-w-[1280px] w-full">
          <Link
            href="/booking"
            className="w-8 h-8 flex items-center justify-center rounded-[10px] border border-[#E4E4E7] bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] hover:bg-[#FAFAFA] duration-200"
          >
            <LeftArrow />
          </Link>
          <div className="flex gap-6 justify-center">
            <Reservation />
            <div className="max-w-[480px] w-full">
              <HotelInfo />
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
