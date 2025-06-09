'use client';

import { Footer } from '@/app/_components/Footer';
import SearchFilter from '../_components/SeacrhFilter';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { CheckBoxes } from './_features/CheckBoxes';
import SearchCard from './_features/SearchCard';
import { Hotel, useHotelsQuery } from '@/generated';
import { useState } from 'react';
import Loading from '../_components/Loading';

const SearchResult = () => {
  const { data, loading } = useHotelsQuery();
  const [filters, setFilters] = useState({
    rating: [] as number[],
    stars: [] as number[],
    amenities: [] as string[],
  });
  const [searchQuery, setSearchQuery] = useState('');

  if (loading) {
    return <Loading />;
  }

  const hotels = data?.hotels || []; // not covered

  const handleFilterChange = (type: 'rating' | 'stars' | 'amenities', value: number | string) => {
    setFilters((prev) => {
      const currentValues = [...prev[type]];
      const index = currentValues.indexOf(value as never);

      if (index === -1) {
        currentValues.push(value as never);
      } else {
        currentValues.splice(index, 1);
      }

      return { ...prev, [type]: currentValues };
    });
  };

  const meetsRatingCriteria = (hotel: Hotel, ratingFilters: number[]) => {
    if (ratingFilters.length === 0) return true;
    const rating = hotel.rating ?? 0; // not covered
    return ratingFilters.some((r) => rating >= r);
  };

  const meetsStarCriteria = (hotel: Hotel, starFilters: number[]) => {
    if (starFilters.length === 0) return true;
    const starRating = hotel.starRating ?? 0; // not covered
    return starFilters.includes(Math.floor(starRating));
  };

  const meetsSearchCriteria = (hotel: Hotel, query: string) => {
    if (!query) return true;
    return hotel.name?.toLowerCase().includes(query.toLowerCase());
  };

  const meetsAmenitiesCriteria = (hotel: Hotel, amenityFilters: string[]) => {
    if (amenityFilters.length === 0) return true;

    const hotelAmenities = (hotel.amenities ?? []).map((a) => a?.toLowerCase()); // not covered from line 63 to 76

    return amenityFilters.every((filter) => {
      const filterLower = filter.toLowerCase();

      if (filterLower === 'wifi') return hotelAmenities.some((a) => a?.includes('wifi'));
      if (filterLower === 'parking') return hotelAmenities.some((a) => a?.includes('parking'));

      return hotelAmenities.includes(filterLower);
    });
  };

  const filteredHotels = hotels.filter((hotel) => {
    if (!hotel) return false;

    return meetsSearchCriteria(hotel, searchQuery) && meetsRatingCriteria(hotel, filters.rating) && meetsStarCriteria(hotel, filters.stars) && meetsAmenitiesCriteria(hotel, filters.amenities);
  });
  return (
    <div>
      <main className="w-screen h-screen">
        <div className="w-full bg-[#013B94] h-20 "></div>
        <SearchFilter />
        <div className="w-[80%] h-[88%] overflow-auto px-14 py-7 mx-auto flex gap-14 ">
          <div className="w-56 max-h-[34rem] flex flex-col gap-2">
            <div className="w-full">
              <Label className="font-medium tracking-wide">Search by property name</Label>
              <Input placeholder="Search" className="w-full mt-2" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              <div className="pt-6 w-full border-b"></div>
              <div className="pb-6 w-full"></div>
            </div>
            <CheckBoxes filters={filters} onFilterChange={handleFilterChange} />
          </div>
          <div className="flex w-[75%] flex-col gap-4">
            <div className="w-full h-6 items-center flex justify-between ">
              <h2>{filteredHotels.length} properties</h2>
            </div>
            <div className="space-y-4">
              {filteredHotels.map((hotel) => (
                <SearchCard
                  key={hotel?._id}
                  hotel={{
                    _id: hotel?._id,
                    name: hotel?.name,
                    rating: hotel?.rating,
                    starRating: hotel?.starRating,
                    imageUrl: hotel?.images?.[0],
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SearchResult;
