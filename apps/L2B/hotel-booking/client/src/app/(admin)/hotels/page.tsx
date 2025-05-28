'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { PanelLeft, Plus } from 'lucide-react';
import Link from 'next/link';
import { FilterHotelsAdmin } from './_components/FilterHotelsAdmin';
import { HotelsTable } from './_components/HotelsTable';
import { Hotel, useHotelsQuery } from '@/generated';
const HotelsPage = () => {
  const { data, loading } = useHotelsQuery();
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([]);
  const validHotels = useMemo(() => {
    return (
      data?.hotels?.filter((hotel): hotel is Hotel => {
        return hotel !== null && typeof hotel._id === 'string' && typeof hotel.name === 'string';
      }) || []
    );
  }, [data?.hotels]);

  useEffect(() => {
    setFilteredHotels(validHotels);
  }, [validHotels]);

  const handleFilterChange = useCallback((filtered: Hotel[]) => {
    setFilteredHotels(filtered);
  }, []);

  if (loading) {
    return <div className="p-6 text-gray-600">Loading hotels...</div>;
  }

  return (
    <div data-cy="Hotels-Page" className="p-6 bg-gray-50 min-h-screen w-full">
      <div>
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <PanelLeft />
          <Link href="/hotels" className="hover:text-blue-600 text-black text-md" data-testid="breadcrumb-hotels-link">
            Hotels
          </Link>
        </div>
      </div>
      <div className="max-w-8xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800" data-testid="page-title">
            Hotels
          </h1>
          <Link href="/hotels/add-hotel" className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors" data-testid="add-hotel-link">
            <Plus className="h-4 w-4" />
            Add Hotel
          </Link>
        </div>
        <div className="rounded-lg shadow-sm">
          <FilterHotelsAdmin hotels={validHotels} onFilterChange={handleFilterChange} />
          <HotelsTable hotels={filteredHotels} />
        </div>
      </div>
    </div>
  );
};
export default HotelsPage;
