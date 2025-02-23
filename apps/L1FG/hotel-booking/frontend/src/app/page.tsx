'use client';

import { HomeHotelList } from '@/components/user/home-page';
import { Hero } from '@/components/user/main/Hero';
import { Loading } from '@/components/user/main/Loading';
import { NavigationBlue } from '@/features/user/main/NavigationBlue';
import { SearchBar } from '@/features/user/main/SearchBar';
import { Footer } from '@/components/user/search-result/Footer';
import { useGetHotelsQuery } from '@/generated';
const Page = () => {
  const { loading, data } = useGetHotelsQuery();

  if (loading) {
    return <Loading />;
  }

  const hotels = data;

  return (
    <main data-cy="User-Home-Page">
      <NavigationBlue />
      <Hero />
      <SearchBar />
      <HomeHotelList data={hotels?.getHotels} />
      <Footer />
    </main>
  );
};

export default Page;
