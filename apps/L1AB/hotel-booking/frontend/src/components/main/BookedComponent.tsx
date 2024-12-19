import { format } from 'date-fns';
import Link from 'next/link';
import { CheckInDialog } from './assets/CheckInDialog';
import { ViewPricingDialog } from './assets/ViewPricingDialog';
import { Button } from '@/components/ui/button';
import { Booking } from '@/generated';

type BookedComponentType = {
  data: Booking;
};

const ButtonStyle = {
  canceled: 'bg-[#E11D48]',
  complelted: 'bg-[#18BA51]',
};

export const BookedComponent = ({ data }: BookedComponentType) => {
  return (
    <div>
      <div className="flex justify-between gap-2 mb-4">
        <h3 className="font-bold">{data?.status === 'booked' ? data?.roomId.hotelId.name : 'Reservation detail'}</h3>
        <p className={`px-[10px] py-[2px] rounded-[9px] text-white ${data?.status === 'canceled' ? ButtonStyle.canceled : ButtonStyle.complelted}`}>{data?.status}</p>
      </div>
      <div className="flex w-full gap-6 mb-4">
        <div className="flex w-full flex-col">
          <p className="text-[#71717A] text-sm">Check in</p>

          <p>{format(data?.checkIn, 'eeee, MMMM d, h:mm a')}</p>
        </div>
        <div className=" flex px-4 gap-3">
          <div className="h-full w-[1px] border border-[#E4E4E7]"></div>
        </div>
        <div className="flex  w-full flex-col">
          <p className="text-[#71717A] text-sm">Check Out</p>
          <p>{format(data?.checkOut, 'eeee, MMMM d, h:mm a')}</p>
        </div>
      </div>
      <div className="flex flex-col">
        <div>
          <CheckInDialog checkInDialogPhone={data.roomId.hotelId.phone} />
        </div>
        <div>
          <ViewPricingDialog />
        </div>
      </div>
      {data?.status === 'booked' ? (
        <div className="flex flex-col gap-3">
          <Button variant="outline" className="border border-[#E4E4E7] rounded-xl">
            Contract property
          </Button>
          <Link href={`/bookings/cancelBooking`}>
            <Button variant="secondary" className="bg-[#2563EB] text-[#FAFAFA] w-full">
              Cancel booking
            </Button>
          </Link>
          <div className="border border-[#E4E4E7] my-5"></div>
        </div>
      ) : (
        <div className="border border-[#E4E4E7] my-5"></div>
      )}
    </div>
  );
};
