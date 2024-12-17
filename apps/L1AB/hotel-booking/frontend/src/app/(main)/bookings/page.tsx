'use client';
import { Loading } from '@/components/main';
import { ConfirmedBooking } from '@/components/main/ConfirmedBooking';
import { PreviousBooking } from '@/components/main/PreviousBooking';
import { Booking, useGetBookingByIdQuery } from '@/generated';

const BookingPage = () => {
  const bookingId = '6756916da16039f4108550f4' as string;
  const { data, loading } = useGetBookingByIdQuery({ variables: { id: bookingId } });
  const bookingData = data?.getBookingById;

  return (
    <div className="max-w-fit m-auto">
      {loading ? (
        <Loading />
      ) : (
        <div>
          <ConfirmedBooking data={bookingData as Booking[]} />
          <PreviousBooking data={bookingData as Booking[]} />
        </div>
      )}
    </div>
  );
};

export default BookingPage;
