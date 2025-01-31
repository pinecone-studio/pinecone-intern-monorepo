import { NavigationBlue } from '@/components/user/main/NavigationBlue';
import { BlueDital } from '@/components/user/ui/dital';
import { HotelDetailMain } from '@/components/user/hotel-detail/HotelDetailMain';
import { SearchBar } from '@/features/user/main/SearchBar';
import { Footer } from '@/components/user/search-result/Footer';
import { useParams } from 'next/navigation';
import { useGetHotelByIdQuery } from '@/generated';
import { Loading } from '@/components/user/main/Loading';

export const HotelDetailPage = () => {
  const params = useParams();
  const hotelId = Array.isArray(params?.id) ? params.id[0] : params?.id;
  console.log(hotelId, 'hotelId');

  const { loading, error, data } = useGetHotelByIdQuery({ variables: { getHotelByIdId: hotelId } });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-lg font-medium">Erorr: {error.message}</div>
      </div>
    );
  }

  const hotelData = data?.getHotelById;

  return (
    <>
      <NavigationBlue />
      <BlueDital />
      <SearchBar />
      <HotelDetailMain data={hotelData} />
      <Footer />
    </>
  );
};
