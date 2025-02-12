'use client';

import { FooterSmall, MainContentBooking } from '@/components/user/booking-page';
import { Loading } from '@/components/user/main/Loading';
import { NavigationWhite } from '@/components/user/main/NavigationWhite';
import { useGetHotelsQuery } from '@/generated';

const Booking = () => {
  const { loading } = useGetHotelsQuery();

  if (loading) {
    return <Loading />;
  }
  return (
    <main data-cy="User-Booking-Page" className="flex flex-col justify-between min-h-screen">
      <NavigationWhite />
      <MainContentBooking />
      <FooterSmall />
    </main>
  );
};

export default Booking;
