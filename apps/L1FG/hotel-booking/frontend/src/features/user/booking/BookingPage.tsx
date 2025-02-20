'use client';

import { FooterSmall, MainContentBooking } from '@/components/user/booking-page';
import { Loading } from '@/components/user/main/Loading';
import { NavigationWhite } from '@/components/user/main/NavigationWhite';
import { useGetBookingsByUserIdQuery, useGetHotelsQuery } from '@/generated';

export const BookingPage = () => {
  const { loading } = useGetHotelsQuery();

  const { loading: bookingsUserIdLoading, data: bookingsUserIdData } = useGetBookingsByUserIdQuery({ variables: { userId: '67b4b9386c092ad193af622a' } });
  console.log(bookingsUserIdData, 'bookingsUserIdData');

  const filtredBookedData = bookingsUserIdData?.getBookingsByUserId?.filter((bookedData) => bookedData?.status === 'Booked');
  const filtredDataCC = bookingsUserIdData?.getBookingsByUserId?.filter((bookedData) => bookedData?.status === 'Cancelled' || bookedData?.status === 'Completed');

  if (loading || bookingsUserIdLoading) {
    return <Loading />;
  }
  return (
    <main data-cy="User-Booking-Page" className="flex flex-col justify-between min-h-screen">
      <NavigationWhite />
      <MainContentBooking filtredBookedData={filtredBookedData || []} filtredDataCC={filtredDataCC || []} />
      <FooterSmall />
    </main>
  );
};
