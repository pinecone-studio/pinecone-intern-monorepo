'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { format } from 'date-fns';
import { useSearchParams } from 'next/navigation';
import { useBookingQuery } from '@/generated';
import Loading from '../_components/Loading';
import { Zap } from 'lucide-react';
import { Suspense } from 'react';

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return format(date, 'EEEE, MMM d, h:mm a');
};

const BookingHeader = () => (
  <div className="mx-auto mb-6" data-cy="booking-header">
    <Image src="/Frame.svg" alt="Booking confirmed" width={128} height={128} className="w-32 h-32" />
  </div>
);

const HotelInfo = ({ hotel }: { hotel: any }) => (
  <div>
    <h2 className="text-xl font-semibold" data-cy="hotel-name">
      {hotel?.name}
    </h2>
    <p className="text-sm text-[#71717A]" data-cy="hotel-location">
      {hotel?.location}
    </p>
    {hotel?.rating && (
      <div className="flex items-center mt-1">
        <span className="bg-blue-600 text-white px-2 py-0.5 rounded text-xs" data-cy="hotel-rating">
          {hotel.rating}
        </span>
        <span className="ml-2 text-sm" data-cy="hotel-rating-text">
          {hotel.rating >= 8 ? 'Excellent' : hotel.rating >= 6 ? 'Good' : 'Average'}
        </span>
      </div>
    )}
  </div>
);

const DateInfo = ({ label, date }: { label: string; date: string }) => (
  <div>
    <p className="text-sm text-[#71717A]">{label}</p>
    <p className="font-medium text-sm" data-cy={label.toLowerCase().replace(' ', '-')}>
      {formatDate(date)}
    </p>
  </div>
);

const Amenities = ({ hotel }: { hotel: any }) => (
  <div className="border-t pt-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
      {hotel?.amenities?.map((amenity: string, index: number) => (
        <div key={index} className="flex items-center gap-2" data-cy={`amenity-${amenity}`}>
          <Zap size={15} />
          <span className="text-sm">{amenity}</span>
        </div>
      ))}
    </div>
  </div>
);

const BookingConfirmationContent = () => {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('bookingId');
  const { data } = useBookingQuery({
    variables: {
      bookingId: bookingId || '',
    },
  });

  if (!data) return <Loading />;

  const booking = data.booking;
  const room = booking?.roomId;
  const hotel = booking?.hotelId;

  return (
    <div className="max-w-xl w-full mx-auto p-6 flex flex-col">
      <BookingHeader />
      <h1 className="text-2xl font-semibold mb-2" data-cy="booking-title">
        You&#39;re confirmed
      </h1>
      <div className="flex justify-between w-full max-w-md mb-4">
        <span className="text-gray-600">Contact email</span>
        <span data-cy="contact-email">{booking?.userId?.email || 'No email provided'}</span>
      </div>
      <Button asChild variant="outline" className="mb-8 w-[40%] bg-blue-600 text-white hover:text-white hover:bg-blue-700" data-cy="view-booking-button">
        <Link href="/my-booking">View your booking</Link>
      </Button>
      <div className="border rounded-lg w-full p-6 space-y-6">
        <HotelInfo hotel={hotel} />
        <div className="space-y-4 border-t pt-4">
          <DateInfo label="Check in" date={booking?.checkInDate} />
          <DateInfo label="Check out" date={booking?.checkOutDate} />
        </div>
        <div className="border-t pt-4">
          <p className="font-medium" data-cy="room-type">
            {room?.type || 'Room type not specified'}
          </p>
          <Amenities hotel={hotel} />
        </div>
      </div>
    </div>
  );
};

const BookingConfirmation = () => (
  <Suspense>
    <BookingConfirmationContent />
  </Suspense>
);

export default BookingConfirmation;
