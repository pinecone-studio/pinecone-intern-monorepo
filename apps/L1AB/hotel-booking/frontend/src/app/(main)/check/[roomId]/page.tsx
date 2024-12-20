'use client';
import { CheckOutHome, Loading } from '@/components/main';
import { Booking, useGetBookingByIdQuery } from '@/generated';
import { useParams } from 'next/navigation';

const CheckInRoomPage = ({ params }: { params: { roomId: string } }) => {
  const { roomId } = useParams();
  console.log('This is roomId from CheckInRoomPage : ====', roomId);

  const { data, loading } = useGetBookingByIdQuery({ variables: { id: params.roomId } });
  const bookingData1 = data?.getBookingById[0];

  console.log(bookingData1, 'data=== FROM  CheckInRoomPage');

  return (
    <div className="max-w-fit m-auto">
      {loading ? (
        <Loading />
      ) : (
        <div>
          <CheckOutHome data={bookingData1 as Booking} />
        </div>
      )}
    </div>
  );
};

export default CheckInRoomPage;
