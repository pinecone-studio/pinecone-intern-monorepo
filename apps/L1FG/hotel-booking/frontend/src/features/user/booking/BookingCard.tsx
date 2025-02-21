'use client';

import Image from 'next/image';
import { BadgeBooked } from '../../../components/user/booking-page/BadgeBooked';
import { Booking, useGetHotelInBookingQuery } from '@/generated';
import { BadgeCompleted } from '../../../components/user/booking-page/BadgeCompleted';
import { BadgeCancelled } from '../../../components/user/booking-page/BadgeCancelled';
import { format, parseISO, differenceInDays } from 'date-fns';
import { useRouter } from 'next/navigation';

interface BookingCardProps {
  booked: Booking | null;
}

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

const getStayDuration = (checkIn?: string, checkOut?: string): string => {
  if (!checkIn || !checkOut) return '0';
  return `${differenceInDays(parseISO(checkOut), parseISO(checkIn))}`;
};

export const BookingCard = ({ booked }: BookingCardProps) => {
  const router = useRouter();
  const status = booked?.status;
  const { data: hotelData } = useGetHotelInBookingQuery({
    variables: { getHotelByIdId: booked?.hotelId || '' },
  });

  const formattedDate = booked?.startDate ? format(parseISO(booked.startDate), 'EEEE, MMM d, h:mma') : '';

  return (
    <div className="w-full flex border border-[#E4E4E7] rounded-md">
      <div className="relative min-w-[395px] h-[222px]">
        <Image
          src={hotelData?.getHotelById?.images[0] || 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/b0/b9/d0/cheap-hotels.jpg?w=1200&h=-1&s=1'}
          alt="Hotel Image"
          className="rounded-t-[6px] w-full h-full object-cover"
          layout="fill"
        />
      </div>
      <div className="w-full p-5 flex flex-col justify-between">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <div className="flex">{getBadgeComponent(status)}</div>
            <div>
              <p className="font-Inter font-bold not-italic text-base leading-7">{hotelData?.getHotelById?.name}</p>
              <p className="font-Inter font-normal not-italic text-sm text-[#71717A]">{hotelData?.getHotelById?.description}</p>
            </div>
          </div>
          <p className="font-Inter font-medium not-italic text-sm">{getStayDuration(booked?.startDate, booked?.endDate)} night • 1 adult • 1 room</p>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex items-center">
              <p className="w-[72px] font-Inter font-normal not-italic text-sm text-[#71717A]">Check in:</p>
              <p className="font-Inter font-medium not-italic text-sm">{formattedDate}</p>
            </div>
            <div className="flex items-center">
              <p className="w-[72px] font-Inter font-normal not-italic text-sm text-[#71717A]">Itinerary:</p>
              <p className="font-Inter font-medium not-italic text-sm">72055771948934</p>
            </div>
          </div>
          <div className="flex items-end">
            <button onClick={() => router.push(`/booking-detail/${booked?.id}`)} className="px-3 py-2 border border-[#E4E4E7] rounded-md">
              <p className="font-Inter font-medium not-italic text-sm">View Detail</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
