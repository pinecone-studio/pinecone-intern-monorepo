'use client';
import { PanelLeft } from 'lucide-react';
import Link from 'next/link';
import { FilterGuestsAdmin } from '../guests/_components/FilterGuestsAdmin';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { GuestTable } from './_components/GuestsTable';
import { Booking, useBookingsQuery } from '@/generated';
import Loading from '@/app/(main)/_components/Loading';

const Guests = () => {
  const { data, loading } = useBookingsQuery();
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const validHotels = useMemo(() => {
    return data?.bookings?.filter((booking): booking is Booking => booking !== null && typeof booking._id === 'string' && typeof booking.status === 'string') || [];
  }, [data?.bookings]);

  useEffect(() => {
    setFilteredBookings(validHotels);
  }, [validHotels]);

  const handleFilterChange = useCallback((filtered: Booking[]) => {
    setFilteredBookings(filtered);
  }, []);
  if (loading) {
    return <Loading />
  }

  return (
    <div data-cy="Guests-Page" className="p-6 bg-gray-50 min-h-screen w-full">
      <div>
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <PanelLeft />
          <Link href="/guests" className="hover:text-blue-600 text-black text-md" data-testid="breadcrumb-hotels-link">
            Guests
          </Link>
        </div>
      </div>
      <div className="max-w-8xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800" data-testid="page-title">
            Guests
          </h1>
        </div>
        <div className="rounded-lg shadow-sm">
          <FilterGuestsAdmin bookings={validHotels} onFilterChange={handleFilterChange} />
          <GuestTable bookings={filteredBookings} />
        </div>
      </div>
    </div>
  );
};

export default Guests;
