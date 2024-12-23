'use client';

import { Loading } from '@/components/main';
import { BookingDetails } from '@/components/main/BookingDetails';
import { Booking, useGetBookingByIdQuery } from '@/generated';

const BookingDetailsPage = ({ params }: { params: { bookingId: string } }) => {
  const { data, loading } = useGetBookingByIdQuery({ variables: { id: params.bookingId } });
  const bookingData = data?.getBookingById[0];

  return (
    <div className="max-w-fit m-auto">
      {loading ? (
        <Loading />
      ) : (
        <div>
          <BookingDetails data={bookingData as Booking} />
        </div>
      )}
    </div>
  );
};

export default BookingDetailsPage;
