'use client';

import React, { useEffect, useState } from 'react';
import { Booking, usePastBookingsQuery, useUpcomingBookingsQuery } from '@/generated';
import { useAuth } from '../_context/AuthContext';
import { UpcomingBooking } from './_components/UpcomingBooking';
import { PastBooking } from './_components/PastBooking';

const MyBookingPage = () => {
  const [upcomingBookings, setUpcomingBookings] = useState<Booking[] | undefined>([]);
  const [pastBookings, setPastBookings] = useState<Booking[] | undefined>([]);
  const { user } = useAuth();
  const { data: upBooking } = useUpcomingBookingsQuery();
  const { data: pastBooking } = usePastBookingsQuery({
    variables: {
      userId: user?._id || '',
    },
  });

  useEffect(() => {
    setUpcomingBookings(upBooking?.upcomingBookings?.filter((booking) => booking.userId._id === user?._id) || []);
  }, [upBooking?.upcomingBookings, user?._id]);

  useEffect(() => {
    setPastBookings(pastBooking?.pastBookings?.filter((booking) => booking.userId._id === user?._id) || []);
  }, [pastBooking?.pastBookings, user?._id]);

  const formatDateTime = (isoDate: string) => {
    const dateObj = new Date(isoDate);

    const formattedDate = dateObj.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    });

    const formattedTime = dateObj.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });

    return `${formattedDate}, ${formattedTime}`;
  };

  const formatNights = (checkInDate: string, checkOutDate: string) => {
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  };

  return (
    <div className="w-full flex flex-col items-center pt-8 ">
      <div className="p-8 flex flex-col gap-8 max-w-[960px] w-full ">
        <UpcomingBooking user={user} formatDateTime={formatDateTime} formatNights={formatNights} bookingsData={upcomingBookings ?? []} />
        <PastBooking formatDateTime={formatDateTime} formatNights={formatNights} bookingsData={pastBookings ?? []} />
      </div>
    </div>
  );
};

export default MyBookingPage;
