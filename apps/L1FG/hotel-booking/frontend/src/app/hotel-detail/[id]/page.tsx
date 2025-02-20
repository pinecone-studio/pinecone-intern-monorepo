'use client';

import { NavigationBlue } from '@/components/user/main/NavigationBlue';
import { BlueDital } from '@/components/user/ui/dital';
import { HotelDetailMain } from '@/components/user/hotel-detail/HotelDetailMain';
import { SearchBar } from '@/features/user/main/SearchBar';
import { Footer } from '@/components/user/search-result/Footer';
import { useGetHotelByIdQuery, useGetRoomsByHotelIdQuery } from '@/generated';
import { Loading } from '@/components/user/main/Loading';

const HotelDetail = ({ params }: { params: { id: string } }) => {
  const hotelId = params.id;

  const { loading: hotelLoading, data: hotel } = useGetHotelByIdQuery({ variables: { getHotelByIdId: hotelId } });
  const { loading: roomLoading, data: room } = useGetRoomsByHotelIdQuery({ variables: { hotelId: hotelId } });

  if (hotelLoading || roomLoading) return <Loading />;

  const hotelData = hotel?.getHotelById;
  const hotelRoomData = room?.getRoomsByHotelId;

  console.log(hotelRoomData, 'hotelRoomData');

  return (
    <main data-cy="Hotel-Detail-Page">
      <NavigationBlue />
      <BlueDital />
      <SearchBar />
      <HotelDetailMain hotelRoomData={hotelRoomData} data={hotelData} />
      <Footer />
    </main>
  );
};

export default HotelDetail;
