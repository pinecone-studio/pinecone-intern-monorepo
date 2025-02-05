import { HomeHotelList } from '@/components/user/home-page';
import { Hero } from '@/components/user/main/Hero';
import { Loading } from '@/components/user/main/Loading';
import { NavigationBlue } from '@/components/user/main/NavigationBlue';
import { SearchBar } from '@/features/user/main/SearchBar';
import { Footer } from '@/components/user/search-result/Footer';
import { useGetHotelsQuery } from '@/generated';

export const HomePage = () => {
  const { loading, error, data } = useGetHotelsQuery();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-lg font-medium">Error: {error.message}</div>
      </div>
    );
  }

  const hotels = data?.getHotels || [];

  return (
    <>
      <NavigationBlue />
      <Hero />
      <SearchBar />
      <HomeHotelList data={hotels} />
      <Footer />
    </>
  );
};
