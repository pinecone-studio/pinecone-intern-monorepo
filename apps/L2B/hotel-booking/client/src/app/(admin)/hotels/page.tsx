'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { PanelLeft, Plus } from 'lucide-react';
import Link from 'next/link';
import { FilterHotelsAdmin } from './_components/FilterHotelsAdmin';
import { HotelsTable } from './_components/HotelsTable';
import { Hotel, useCreateHotelMutation, useHotelsQuery } from '@/generated';
import { useRouter } from 'next/navigation';
const HotelsPage = () => {
  const router = useRouter();
  const { data, loading, refetch } = useHotelsQuery();
  const [createHotel] = useCreateHotelMutation();
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([]);
  const [isCreating, setIsCreating] = useState(false);
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

  const addHotel = async () => {
    setIsCreating(true);
    const data = await createHotel({
      variables: {
        input: {
          starRating: 1,
        },
      },
    });
    if (data.data?.createHotel) {
      router.push(`/hotels/${data.data.createHotel._id}`);
      setIsCreating(false);
    }
    refetch();
  };
  return (
    <div data-testid="Hotels-Page" className="p-6 bg-gray-50 min-h-screen w-full">
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
          <div
            onClick={!isCreating ? addHotel : undefined}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${isCreating ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 cursor-pointer text-white'}`}
            data-testid="add-hotel-div"
          >
            <Plus className="h-4 w-4" />
            {isCreating ? 'Creating...' : 'Add Hotel'}
          </div>
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
