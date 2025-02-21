import { NavigationBlue } from '@/features/user/main/NavigationBlue';
import { SearchBar } from '@/features/user/main/SearchBar';
import { Loading } from '@/components/user/main/Loading';
import { MainResultSearch } from '@/components/user/search-result/MainSearchResult';
import { BlueDital } from '@/components/user/ui/dital';
import { useGetAllQuerieQuery, useGetHotelsQuery } from '@/generated';
import { Footer } from '@/components/user/search-result/Footer';
import { useState } from 'react';
import { useQueryState } from 'nuqs';

export const SearchResultPage = () => {
  const [searchValuePrice, setSearchValuePrice] = useState<'asc' | 'desc' | string>('');
  const [dateFrom] = useQueryState('dateFrom');
  const [dateTo] = useQueryState('dateTo');
  const [adultCout] = useQueryState('bedcount');
  const adultCountNumber = Number(adultCout);
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [selectedStar, setSelectedStar] = useState<number>(0);
  const [selectedAmenities, setSelectedAmenities] = useState<Array<string>>([]);
  const [selectedName, setSelectedName] = useState<string>('');

  const { loading: loadingHotels } = useGetHotelsQuery();
  const {
    error: errorAllQuerie,
    data: dataAllQuerie,
    loading,
  } = useGetAllQuerieQuery({
    variables: { input: { endDate: dateTo, startDate: dateFrom, travellerCount: adultCountNumber, type: searchValuePrice } },
  });

  if (loadingHotels) {
    return <Loading />;
  }

  if (errorAllQuerie) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-lg font-medium">Error: {errorAllQuerie?.message || errorAllQuerie?.message}</div>
      </div>
    );
  }

  const hotels = dataAllQuerie?.getAllQuerie || [];

  const filteredDataByRating = hotels.filter((filterData) => {
    let checker = true;
    if (selectedRating !== null) {
      checker = filterData?.rating !== null && filterData?.rating !== undefined && filterData?.rating >= selectedRating;
    }

    return checker;
  });

  const filteredDataByStar = filteredDataByRating.filter((filterData) => {
    let checker = true;
    if (selectedStar !== 0) {
      checker = filterData?.starRating !== null && filterData?.starRating !== undefined && filterData?.starRating == selectedStar;
    }

    return checker;
  });

  const filteredDateByAmenities = filteredDataByStar.filter((filterData) => {
    let checker = true;
    if (selectedAmenities.length !== 0) {
      checker = selectedAmenities.every((amenity) => filterData?.amenities?.includes(amenity));
    }

    return checker;
  });

  const filteredDataByName = filteredDateByAmenities.filter((filterData) => {
    let checker = true;
    if (selectedName !== '') {
      checker = filterData?.name !== undefined && filterData?.name.toLowerCase().includes(selectedName.toLowerCase());
    }

    return checker;
  });

  return (
    <>
      <NavigationBlue />
      <BlueDital />
      <SearchBar />
      <MainResultSearch
        setSelectedName={setSelectedName}
        data={filteredDataByName}
        setSearchValuePrice={setSearchValuePrice}
        setSelectedRating={setSelectedRating}
        setSelectedStar={setSelectedStar}
        setSelectedAmenities={setSelectedAmenities}
        selectedRating={selectedRating}
        selectedStar={selectedStar}
        selectedAmenities={selectedAmenities}
        isLoading={loading}
      />
      <Footer />
    </>
  );
};
