import { BadgeBooked, BadgeCancelled, BadgeCompleted } from '@/components/user/booking-page';
import { GetBookingByIdQuery, useGetHotelByIdQuery } from '@/generated';
import { useRouter } from 'next/navigation';
import { format, parseISO } from 'date-fns';

interface ReservationProps {
  idParams?: string;
  bookingByIdData: GetBookingByIdQuery | undefined;
}

// Статусын badge харуулах тусдаа функц
const getBadgeComponent = (status: string | undefined) => {
  switch (status) {
    case 'Booked':
      return <BadgeBooked />;
    case 'Completed':
      return <BadgeCompleted />;
    case 'Cancelled':
      return <BadgeCancelled />;
    default:
      return null;
  }
};

// Огноог форматлах тусдаа функц
const formatDate = (date: string | undefined) => {
  return date ? format(parseISO(date), 'EEEE, MMM d, h:mma') : '';
};

// Үйлдлийн хэсгийг харуулах тусдаа функц
const renderActions = (status: string | undefined, idParams: string | undefined, router: any) => {
  if (status === 'Cancelled' || status === 'Completed') return null;

  return (
    <div className="flex flex-col gap-2">
      <button className="px-3 py-2 text-[#18181B] font-Inter text-sm font-medium border border-[#E4E4E7] rounded-[6px]">Contract property</button>
      <button onClick={() => router.push(`/cancel-booking/${idParams}`)} className="px-3 py-2 text-[#FAFAFA] font-Inter text-sm font-medium rounded-[6px] bg-[#2563EB]">
        Cancel booking
      </button>
    </div>
  );
};

export const Reservation = ({ idParams, bookingByIdData }: ReservationProps) => {
  const router = useRouter();
  const booking = bookingByIdData?.getBookingById;
  const hotelId = booking?.hotelId || '';
  const { data: hotelGetData } = useGetHotelByIdQuery({ variables: { getHotelByIdId: hotelId } });

  return (
    <div className="max-w-[712px] w-full p-6 flex flex-col gap-6 bg-white border border-[#E4E4E7] rounded-[6px]">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <p className="text-[#09090B] font-Inter text-2xl font-semibold tracking-[-0.6px]">{hotelGetData?.getHotelById?.name}</p>
          {getBadgeComponent(booking?.status)}
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-8">
            {/* Check-in */}
            <div className="flex flex-col gap-1 max-w-[282.5px] w-full">
              <p className="text-[#71717A] font-Inter text-sm font-normal">Check in</p>
              <p className="text-[#09090B] font-Inter text-base font-normal">{formatDate(booking?.startDate)}</p>
            </div>

            <div className="h-full px-4 flex justify-center">
              <div className="w-[1px] bg-[#E4E4E7]"></div>
            </div>

            {/* Check-out */}
            <div className="flex flex-col gap-1 max-w-[282.5px] w-full">
              <p className="text-[#71717A] font-Inter text-sm font-normal">Check out</p>
              <p className="text-[#09090B] font-Inter text-base font-normal">{formatDate(booking?.endDate)}</p>
            </div>
          </div>

          {/* Нэмэлт мэдээлэл */}
          <div className="flex flex-col">
            <p className="py-2 text-[#2563EB] font-Inter text-sm font-medium">Check-in and special instructions</p>
            <p className="py-2 text-[#2563EB] font-Inter text-sm font-medium">View pricing details</p>
          </div>
        </div>

        {/* Үйлдлийн хэсэг */}
        {renderActions(booking?.status, idParams, router)}
      </div>

      {/* Хуваагч */}
      <div className="py-4 w-full">
        <div className="w-full h-[1px] bg-[#E4E4E7]"></div>
      </div>

      {/* Room details */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <p className="text-[#71717A] font-Inter text-sm font-normal">Room detail</p>
          <p className="text-[#09090B] font-Inter text-xl font-semibold tracking-[-0.5px]">Standard Single Room, 1 King Bed</p>
        </div>

        <div className="flex items-center gap-10">
          <div className="flex flex-col gap-1">
            <p className="text-[#71717A] font-Inter text-sm font-normal">Reserved for</p>
            <p className="text-[#09090B] font-Inter text-base font-normal">{booking?.email}, 1 adult</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-[#71717A] font-Inter text-sm font-normal">Request</p>
            <p className="text-[#09090B] font-Inter text-base font-normal">Non-Smoking</p>
          </div>
        </div>

        <button className="px-3 py-2 border border-[#E4E4E7] rounded-[6px] text-[#18181B] font-Inter text-sm font-medium">View rules & restrictions</button>
      </div>

      {/* Хуваагч */}
      <div className="py-4 w-full">
        <div className="w-full h-[1px] bg-[#E4E4E7]"></div>
      </div>

      {/* Pedia support */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <p className="text-[#09090B] font-Inter text-xl font-semibold tracking-[-0.5px]">Pedia support</p>
          <p className="text-[#71717A] font-Inter text-sm font-normal">Contact Pedia if you need help managing this Itinerary</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-[#71717A] font-Inter text-sm font-normal">Itinerary:</p>
          <p className="text-[#09090B] font-Inter text-base font-normal">72055771948934</p>
        </div>

        <button className="px-3 py-2 border border-[#E4E4E7] rounded-[6px] text-[#18181B] font-Inter text-sm font-medium">Call {hotelGetData?.getHotelById?.phoneNumber}</button>
      </div>
    </div>
  );
};
