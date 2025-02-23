'use client';

import { FooterSmall, MainContentBooking } from '@/components/user/booking-page';
import { Loading } from '@/components/user/main/Loading';
import { NavigationWhite } from '@/features/user/main/NavigationWhite';
import { useGetBookingsByUserIdQuery, useGetHotelsQuery } from '@/generated';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState, useMemo } from 'react';

type TokenPayload = {
  userId: string;
  iat: number;
  exp: number;
};

function decodeToken(token: string): TokenPayload {
  try {
    const decoded = jwtDecode<TokenPayload>(token);
    return decoded;
  } catch (error) {
    throw new Error('Failed to decode token');
  }
}

export const BookingPage = () => {
  const [userIdState, setUserIdState] = useState<string | null>(null);

  useEffect(() => {
    const userIdToken = localStorage.getItem('token');
    if (userIdToken) {
      try {
        const decoded = decodeToken(userIdToken);
        setUserIdState(decoded.userId);
      } catch (error) {
        console.error(error);
      }
    }
  }, []);

  const userID = userIdState ? { userId: userIdState } : null;

  const { loading: hotelsLoading } = useGetHotelsQuery();
  const { loading: bookingsLoading, data: bookingsUserIdData } = useGetBookingsByUserIdQuery({
    skip: !userID,
    variables: { userId: userID?.userId || '' },
  });

  // Move useMemo hooks before any conditional returns
  const filtredBookedData = useMemo(() => {
    return bookingsUserIdData?.getBookingsByUserId?.filter((bookedData) => bookedData?.status === 'Booked') || [];
  }, [bookingsUserIdData]);

  const filtredDataCC = useMemo(() => {
    return bookingsUserIdData?.getBookingsByUserId?.filter((bookedData) => bookedData?.status === 'Cancelled' || bookedData?.status === 'Completed') || [];
  }, [bookingsUserIdData]);

  // Check loading state after memoized values
  const isLoading = hotelsLoading || bookingsLoading;
  if (isLoading) {
    return <Loading />;
  }

  return (
    <main data-cy="User-Booking-Page" className="flex flex-col justify-between min-h-screen">
      <NavigationWhite />
      <MainContentBooking filtredBookedData={filtredBookedData} filtredDataCC={filtredDataCC} />
      <FooterSmall />
    </main>
  );
};
