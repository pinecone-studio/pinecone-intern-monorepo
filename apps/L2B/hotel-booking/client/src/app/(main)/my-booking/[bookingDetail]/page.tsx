'use client';
import { Booking, useBookingQuery } from '@/generated';
import { BookingDetail } from './_components/BookingDetail';
import { useEffect, useState } from 'react';

const BookingDetailPage = ({ params }: { params: { bookingDetail: string } }) => {
  const { data } = useBookingQuery({
    variables: {
      bookingId: params.bookingDetail,
    },
    skip: !params.bookingDetail,
  });

  const [booking, setBooking] = useState<Booking | null | undefined>();

  useEffect(() => {
    setBooking(data?.booking);
  }, [data?.booking]);

  const getFormattedDateAndTime = (dateStr: string): { date: string; time: string } => {
    const date = new Date(dateStr);

    const dateOptions: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    };
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    };

    const formattedDate = date.toLocaleDateString('en-US', dateOptions);
    const formattedTime = date.toLocaleTimeString('en-US', timeOptions);

    return {
      date: formattedDate,
      time: formattedTime,
    };
  };

  const checkIn = getFormattedDateAndTime(booking?.checkInDate);
  const checkOut = getFormattedDateAndTime(booking?.checkOutDate);

  return (
    <div className="min-h-screen  p-4">
      <BookingDetail booking={booking} checkIn={checkIn} checkOut={checkOut} />
    </div>
  );
};

export default BookingDetailPage;
