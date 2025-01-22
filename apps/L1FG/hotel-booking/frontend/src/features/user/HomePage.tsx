import { HomeHotelList } from '@/components/user/home-page';
import { Hero } from '@/components/user/main/Hero';
import { NavigationBlue } from '@/components/user/main/NavigationBlue';
import { SearchBar } from '@/components/user/main/SearchBar';
import { useGetHotelsQuery } from '@/generated';

export const HomePage = () => {
  const { loading, error, data } = useGetHotelsQuery();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg font-medium">Loading ...</div>
      </div>
    );
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
    </>
  );
};
