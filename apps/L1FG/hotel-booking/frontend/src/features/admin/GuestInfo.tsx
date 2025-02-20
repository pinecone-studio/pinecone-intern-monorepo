'use client';

import { Footer } from '@/components/admin/main/Footer';
import { Header } from '@/components/admin/main/Header';
import { Sidebar } from '@/features/admin/main/Sidebar';
import { LeftArrow } from '@/components/admin/svg';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEditBookingStatusMutation, useGetBookingByIdQuery, useGetRoomByIdQuery } from '@/generated';
import { GuestInfoContainer } from '@/components/admin/guest/GuestInfoContainer';
import { RoomInfoContainer } from '@/components/admin/guest/RoomInfoContainer';

export const GuestInfo = () => {
  const params = useParams();
  const bookingId = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const { data: bookingQueryData, refetch } = useGetBookingByIdQuery({
    variables: { getBookingByIdId: bookingId },
    skip: !bookingId,
  });

  const bookingData = bookingQueryData?.getBookingById;

  const { data: roomQueryData } = useGetRoomByIdQuery({
    variables: { getRoomByIdId: bookingData?.roomId || '' },
    skip: !bookingData?.roomId,
  });

  const roomData = roomQueryData?.getRoomById;

  const [editBookingStatus] = useEditBookingStatusMutation();

  const handleEditBookingStatus = async (newStatus: string) => {
    if (!bookingId) {
      console.error('Booking ID is missing');
      return;
    }

    try {
      await editBookingStatus({
        variables: {
          input: {
            id: bookingId,
            status: newStatus,
          },
        },
      });

      refetch();
    } catch (error) {
      console.error('Error edit booking status:', error);
    }
  };

  return (
    <div className="flex">
      <Sidebar hotels="" guests="active" />
      <div className="flex flex-col w-full min-h-screen">
        <Header />
        <div className="w-full h-full flex justify-center bg-[#F4F4F5]">
          <div className="py-4 flex flex-col gap-4 max-w-[1200px] w-full">
            <div className="flex items-center gap-4">
              <Link
                href="/admin/guests"
                className="w-8 h-8 flex items-center justify-center rounded-[10px] border border-[#E4E4E7] bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] hover:bg-[#F4F4F5] duration-200"
              >
                <LeftArrow />
              </Link>
              <p className="font-Inter text-[#020617] text-lg font-semibold">{bookingData?.cardName || '-/-'}</p>
            </div>
            <div className="flex gap-4">
              <div className="max-w-[744px] w-full">
                <GuestInfoContainer data={bookingData} roomData={roomData} handleEditBookingStatus={(newStatus) => handleEditBookingStatus(newStatus)} />
              </div>
              <RoomInfoContainer data={bookingData} roomData={roomData} />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};
