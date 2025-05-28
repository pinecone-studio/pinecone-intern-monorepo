'use client';

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { SelectFilter } from '../../_components/SelectFilter';
import { Hotel } from '@/generated';

interface FilterHotelsAdminProps {
  hotels: Hotel[];
  onFilterChange?: (_filteredHotels: Hotel[]) => void;
}

export const FilterHotelsAdmin = ({ hotels, onFilterChange }: FilterHotelsAdminProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [starFilter, setStarFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');

  const matchesSearchTerm = (hotel: Hotel) => hotel.name?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false;

  const matchesStarFilter = (hotel: Hotel) => starFilter === 'all' || String(hotel.starRating ?? 0) === starFilter;

  const matchesRatingFilter = (hotel: Hotel) => ratingFilter === 'all' || (hotel.rating ?? 0) >= Number(ratingFilter);

  const filterHotels = () => {
    return hotels.filter((hotel) => matchesSearchTerm(hotel) && matchesStarFilter(hotel) && matchesRatingFilter(hotel));
  };

  useEffect(() => {
    const filtered = filterHotels();
    onFilterChange?.(filtered);
  }, [searchTerm, starFilter, ratingFilter, hotels, onFilterChange]);

  const getStarOptions = () => [
    { item: 'All Stars', value: 'all' },
    ...Array.from({ length: 5 }, (_, i) => ({
      item: `${i + 1} Star${i > 0 ? 's' : ''}`,
      value: `${i + 1}`,
    })),
  ];

  const getRatingOptions = () => [
    { item: 'All Ratings', value: 'all' },
    { item: '9+ Excellent', value: '9' },
    { item: '8+ Very Good', value: '8' },
    { item: '7+ Good', value: '7' },
  ];

  return (
    <div data-cy="FilterHotelsAdmin" className="w-full flex gap-3 mb-6 flex-wrap">
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="Search hotels..."
          data-testid="search-input"
        />
      </div>
      <SelectFilter placeholder="Star Rating" items={getStarOptions()} value={starFilter} onValueChange={setStarFilter} className="w-[180px]" dataTestId="star-rating-filter" />
      <SelectFilter placeholder="User Rating" items={getRatingOptions()} value={ratingFilter} onValueChange={setRatingFilter} className="w-[180px]" dataTestId="user-rating-filter" />
    </div>
  );
};
