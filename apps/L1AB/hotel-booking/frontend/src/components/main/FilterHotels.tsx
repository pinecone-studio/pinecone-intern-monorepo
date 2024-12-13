'use client';

import React, { useState } from 'react';
import { Container, FilterHotelCard } from './assets';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useGetAllHotelsQuery } from '@/generated';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const FilterHotels = () => {
  const { data } = useGetAllHotelsQuery();
  const hotels = data?.getAllHotels || [];

  const [query, setQuery] = useState('');
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedStars, setSelectedStars] = useState<number | null>(null);
  const [filteredHotels, setFilteredHotels] = useState(hotels);


  const applyFilters = (searchQuery: string, rating: number | null, stars: number | null) => {
    const filtered = hotels.filter((hotel) => {
      const matchesQuery = hotel.name.toLowerCase().includes(searchQuery);
      const matchesRating =  hotel.rating >= rating!
      const matchesStars = stars ? hotel.stars === stars : true;
      return matchesQuery && matchesRating && matchesStars;
    });

    setFilteredHotels(filtered);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = event.target.value.toLowerCase();
    setQuery(searchQuery);
    applyFilters(searchQuery, selectedRating, selectedStars);
  };

  const handleRatingFilter = (rating: number | null) => {
    setSelectedRating(rating);
    applyFilters(query, rating, selectedStars);
  };
  const handleStarsFilter = (stars: number | null) => {
    setSelectedStars(stars);
    applyFilters(query, selectedRating, stars);
  };
  return (
    <Container backgroundColor="bg-white">
      <div className="py-8 px-[60px] flex justify-between gap-12 w-full">
        <div className="min-w-[240px] space-y-4">
          <div className="flex flex-col gap-2">
            <p className="text-sm">Search by property name</p>
            <Input
              placeholder="Search"
              type="text"
              value={query}
              onChange={handleSearch}
            />
          </div>

          <div className="border-t pt-5">
            <p className="text-sm font-medium">Rating</p>
            <RadioGroup
            data-testid="rating-radio"
              value={selectedRating?.toString()} 
              onValueChange={(value) => handleRatingFilter(parseInt(value, 10))}
              className="space-y-5 text-sm mt-5"
            >
              {[9, 8, 7].map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={rating.toString()} 
                    id={`rating-${rating}`}
                  />
                  <Label htmlFor={`rating-${rating}`} >
                    +{rating}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div>
            <p className="text-sm font-medium">Stars</p>
            <RadioGroup
            data-testid="star-radio"
              value={selectedStars?.toString()} 
              onValueChange={(value) => handleStarsFilter(parseInt(value, 10))} 
              className="space-y-5 text-sm mt-5"
            >
              {[5, 4, 3, 2, 1].map((stars) => (
                <div key={stars} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={stars.toString()}
                    id={`stars-${stars}`}
                  />
                  <Label htmlFor={`stars-${stars}`} >
                    {stars} stars
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>

        <div className="w-full space-y-4">
          <div className="flex justify-between">
            <p>{filteredHotels.length} properties found</p>
            <Select>
              <SelectTrigger className="w-[240px]">
                <SelectValue placeholder="Sort by" defaultValue="Recommended" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Recommended">Recommended</SelectItem>
                  <SelectItem value="Price-LowToHigh">Price: Low to High</SelectItem>
                  <SelectItem value="Price-HighToLow">Price: High to Low</SelectItem>
                  <SelectItem value="StarRating">Star Rating</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="w-full flex flex-col gap-4">
            {filteredHotels.length > 0 ? (
              filteredHotels.map((hotel) => (
                <FilterHotelCard
                  key={hotel._id}
                  id={hotel._id}
                  name={hotel.name}
                  image={hotel.images[0]}
                  stars={hotel.stars}
                  rating={hotel.rating}
                />
              ))
            ) : (
              <p>No hotels found.</p>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};
