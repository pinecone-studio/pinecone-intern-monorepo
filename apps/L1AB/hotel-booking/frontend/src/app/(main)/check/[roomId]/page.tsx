'use client';
import { CheckOutHome, Loading } from '@/components/main';
import { Room, useGetRoomByIdQuery } from '@/generated';

const CheckInRoomPage = ({ params }: { params: { roomId: string } }) => {
  const { data, loading } = useGetRoomByIdQuery({ variables: { id: params.roomId } });

  console.log({ data });

  const bookingData1 = data?.getRoomById[0];

  return (
    <div className="max-w-fit m-auto">
      {loading ? (
        <Loading />
      ) : (
        <div>
          <CheckOutHome roomData={bookingData1 as Room} />
        </div>
      )}
    </div>
  );
};

export default CheckInRoomPage;
