'use client';
import { CheckoutFooter } from '@/features/user/check-out/CheckoutFooter';
import { CheckOutMain } from '@/features/user/check-out/CheckOutMain';
import { NavigationWhite } from '@/features/user/main/NavigationWhite';

import { useGetRoomByIdQuery } from '@/generated';

const CheckOut = ({ params }: { params: { id: string } }) => {
  const roomId = params.id;
  const { loading: hotelLoading, data: room } = useGetRoomByIdQuery({ variables: { getRoomByIdId: roomId } });
  const roomData = room?.getRoomById
  
  return (
    <main>
      <NavigationWhite />
      <CheckOutMain room ={roomData}/>
      <CheckoutFooter />
    </main>
  );
};
export default CheckOut;
