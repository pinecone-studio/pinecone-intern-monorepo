'use client';

import { NavigationBlue } from '@/components/user/main/NavigationBlue';
import { BlueDital } from '@/components/user/ui/dital';
import { HotelDetailMain } from '@/components/user/hotel-detail/HotelDetailMain';
import { SearchBar } from '@/features/user/main/SearchBar';
import { Footer } from '@/components/user/search-result/Footer';
import { useGetHotelByIdQuery } from '@/generated';
import { Loading } from '@/components/user/main/Loading';

const HotelDetail = ({ params }: { params: { id: string } }) => {
  const hotelId = params.id;

  const { loading, data } = useGetHotelByIdQuery({ variables: { getHotelByIdId: hotelId } });

  if (loading) return <Loading />;

  const hotelData = data?.getHotelById;

  return (
    <main data-cy="Hotel-Detail-Page">
      <NavigationBlue />
      <BlueDital />
      <SearchBar />
      <HotelDetailMain data={hotelData} />
      <Footer />
    </main>
  );
};

export default HotelDetail;
