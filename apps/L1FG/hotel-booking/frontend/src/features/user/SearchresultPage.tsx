import { NavigationBlue } from '@/components/user/main/NavigationBlue';
import { SearchBar } from '@/features/user/main/SearchBar';
import { Loading } from '@/components/user/main/Loading';
import { MainResultSearch } from '@/components/user/search-result/MainSearchResult';
import { BlueDital } from '@/components/user/ui/dital';
import { useGetHotelsByPriceQuery, useGetHotelsQuery } from '@/generated';
import { Footer } from '@/components/user/search-result/Footer';
import { useState } from 'react';
import { useQueryState } from 'nuqs';

export const SearchResultPage = () => {
  const [searchValuePrice, setSearchValuePrice] = useState<'asc' | 'desc' | string>('');
  const [dateFrom] = useQueryState('dateFrom');
  const [dateTo] = useQueryState('dateTo');
  const [adultCout] = useQueryState('bedcount');
  console.log(dateFrom, dateTo, adultCout, 'search hiih zuils');

  const { loading: loadingHotels } = useGetHotelsQuery();
  const { error: errorHotelsByPrice, data: dataHotelByPrice } = useGetHotelsByPriceQuery({ variables: { input: { type: searchValuePrice } } });

  if (loadingHotels) {
    return <Loading />;
  }

  if (errorHotelsByPrice) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-lg font-medium">Error: {errorHotelsByPrice.message || errorHotelsByPrice?.message}</div>
      </div>
    );
  }

  const hotels = dataHotelByPrice?.getHotelsByPrice || [];
  return (
    <>
      <NavigationBlue />
      <BlueDital />
      <SearchBar />
      <MainResultSearch data={hotels} setSearchValuePrice={setSearchValuePrice} />
      <Footer />
    </>
  );
};
