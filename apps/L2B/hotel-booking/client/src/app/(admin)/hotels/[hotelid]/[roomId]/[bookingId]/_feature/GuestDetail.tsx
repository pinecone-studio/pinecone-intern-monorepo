'use client';

import { ChevronLeft } from 'lucide-react';
import { Navbar } from '../_components/Navbar';
import { GuestInfoCard } from '../_components/GuestInfoCard';
import { RoomPriceDetail } from '../_components/RoomPriceDetail';
import { Booking, BookingStatus, useBookingQuery, useUpdateBookingStatusMutation } from '@/generated';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export const GuestInfoPage = () => {
  const [guestInfo, setGuestInfo] = useState<Booking | undefined | null>();
  const [open, setOpen] = useState(false);

  const params = useParams();
  const bookingId = params?.bookingId as string;

  const [updateBookingStatus, { loading }] = useUpdateBookingStatusMutation();

  const handleUpdateStatus = async (status: 'checked_out' | 'cancelled') => {
    await updateBookingStatus({
      variables: {
        updateBookingStatusId: bookingId,
        status: status as BookingStatus,
      },
    });
    await refetch();
    setOpen(false);
  };

  const { data, refetch } = useBookingQuery({
    variables: { bookingId: bookingId || '' },
    skip: !bookingId,
  });

  console.log('data.booking', data?.booking);

  useEffect(() => {
    if (data?.booking) {
      setGuestInfo(data.booking);
    }
  }, [data?.booking]);

  const calculateNights = (checkIn: string, checkOut: string): number => {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    const diffInTime = checkOutDate.getTime() - checkInDate.getTime();

    const diffInDays = diffInTime / (1000 * 60 * 60 * 24);

    return diffInDays;
  };

  const nights = calculateNights(guestInfo?.checkInDate, guestInfo?.checkOutDate);

  const checkInRawDate = guestInfo?.checkInDate;
  const checkInDate = new Date(checkInRawDate);
  const checkInCleanDate = checkInDate.toLocaleDateString('en-CA');

  const checkOutRawDate = guestInfo?.checkOutDate;
  const checkOutDate = new Date(checkOutRawDate);
  const checkOutCleanDate = checkOutDate.toLocaleDateString('en-CA');

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <main className="flex-1 p-6">
        <Navbar data={guestInfo} />

        <div className="flex items-center gap-4 mb-6">
          <button className="p-2 rounded-full border">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h1 className="text-xl font-semibold">
            {guestInfo?.userId.firstName} {guestInfo?.userId.lastName}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-[1200px] mx-auto w-full">
          <GuestInfoCard
            loading={loading}
            open={open}
            setOpen={setOpen}
            handleUpdateStatus={handleUpdateStatus}
            checkInDate={checkInCleanDate}
            checkOutDate={checkOutCleanDate}
            guestInfo={guestInfo}
          />
          <RoomPriceDetail nights={nights} guestInfo={guestInfo} />
        </div>
      </main>
    </div>
  );
};
