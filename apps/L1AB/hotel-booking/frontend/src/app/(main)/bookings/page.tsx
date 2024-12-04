'use client';
import { BookingConfirmedBooking } from '@/components/main';

import PreviousBooking from '@/components/main/PrevoiusBooking';

const BookingPage = () => {
  return (
    <div>
      Booking Page
      <BookingConfirmedBooking />
      <PreviousBooking />
    </div>
  );
};

export default BookingPage;
