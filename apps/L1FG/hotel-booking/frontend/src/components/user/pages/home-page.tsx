import { useGetHotelsQuery } from '@/generated';
import { Hero } from '../features/Hero';
import { SearchBar } from '../features/SearchBar';

import { HomeHotelList } from '../home-page';
import { NavigationBlue } from '../Navigations';

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
    <main>
      <NavigationBlue />
      <Hero />
      <SearchBar />
      <HomeHotelList data={hotels} />
    </main>
  );
};
