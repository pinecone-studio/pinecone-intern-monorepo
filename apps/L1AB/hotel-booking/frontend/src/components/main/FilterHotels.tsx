'use client';

import React, { useState } from 'react';
import { Container, FilterHotelCard } from './assets';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useGetAllHotelsQuery } from '@/generated';
import { HotelSorter } from './assets/HotelSorting';

export const FilterHotels = () => {
  const { data } = useGetAllHotelsQuery();
  const hotels = data?.getAllHotels || [];
  
  const [query, setQuery] = useState('');
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedStars, setSelectedStars] = useState<number | null>(null);
  const [sortOption, setSortOption] = useState('Recommended');
  const [filteredHotels, setFilteredHotels] = useState(hotels);

  const applyFilters = (searchQuery: string, rating: number | null, stars: number | null, options: string) => {
    const filtered = hotels.filter((hotel) => {
      const matchesQuery = hotel.name.toLowerCase().includes(searchQuery);
      const matchesRating = rating ? hotel.rating >= rating : true;
      const matchesStars = stars ? hotel.stars === stars : true;
      return matchesQuery && matchesRating && matchesStars;
    });

    if (options === 'Price-LowToHigh') {
      filtered.sort((a, b) => (a.rooms?.[0]?.price as number) - (b.rooms?.[0]?.price as number));
    } else if (options === 'Price-HighToLow') {
      filtered.sort((a, b) => (b.rooms?.[0]?.price as number) - (a.rooms?.[0]?.price as number));
    } else if (options === 'StarRating') {
      filtered.sort((a, b) => b.stars - a.stars);
    }

    setFilteredHotels(filtered);
  };

  
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = event.target.value.toLowerCase();
    setQuery(searchQuery);
    applyFilters(searchQuery, selectedRating, selectedStars, sortOption);
  };

  const handleRatingFilter = (rating: number | null) => {
    setSelectedRating(rating);
    applyFilters(query, rating, selectedStars, sortOption);
  };

  const handleStarsFilter = (stars: number | null) => {
    setSelectedStars(stars);
    applyFilters(query, selectedRating, stars, sortOption);
  };

  const handleSortChange = (value: string) => {
    setSortOption(value);
    applyFilters(query, selectedRating, selectedStars, value);
  };

  return (
    <Container backgroundColor="bg-white">
      <div className="py-8 px-[60px] flex justify-between gap-12 w-full">
        <div className="min-w-[240px] space-y-4">
          <div className="flex flex-col gap-2">
            <p className="text-sm">Search by property name</p>
            <Input placeholder="Search" type="text" value={query} onChange={handleSearch} />
          </div>
          <div className="border-t pt-5">
            <p className="text-sm font-medium">Rating</p>
            <RadioGroup data-testid="rating-radio" value={selectedRating?.toString()} onValueChange={(value) => handleRatingFilter(parseInt(value, 10))} className="space-y-5 text-sm mt-5">
              {[9, 8, 7].map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                  <RadioGroupItem value={rating.toString()} id={`rating-${rating}`} />
                  <Label htmlFor={`rating-${rating}`}>+{rating}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <div>
            <p className="text-sm font-medium">Stars</p>
            <RadioGroup data-testid="star-radio" value={selectedStars?.toString()} onValueChange={(value) => handleStarsFilter(parseInt(value, 10))} className="space-y-5 text-sm mt-5">
              {[5, 4, 3, 2, 1].map((stars) => (
                <div key={stars} className="flex items-center space-x-2">
                  <RadioGroupItem value={stars.toString()} id={`stars-${stars}`} />
                  <Label htmlFor={`stars-${stars}`}>{stars} stars</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>

        <div className="w-full space-y-4">
          <div className="flex justify-between">
            <p>{filteredHotels.length} properties found</p>
            <HotelSorter sortOption={sortOption} onSortChange={handleSortChange} />
          </div>

          <div className="w-full flex flex-col gap-4">
            {filteredHotels.length > 0 ? (
              filteredHotels.map((hotel) => {
                const roomPrice = hotel.rooms?.[0]?.price || 'N/A';
                return (
                  <FilterHotelCard
                    key={hotel._id}
                    id={hotel._id}
                    name={hotel.name}
                    image={hotel.images[0]}
                    stars={hotel.stars}
                    rating={hotel.rating}
                    room={{ price: typeof roomPrice === 'number' ? roomPrice : 0 }}
                  />
                );
              })
            ) : (
              <p>No hotels found.</p>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};
