'use client';

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { SelectFilter } from '../../_components/SelectFilter';
import { Booking } from '@/generated';

interface FilterGuestsAdminProps {
  bookings: Booking[];
  onFilterChange?: (_filteredHotels: Booking[]) => void;
}

export const FilterGuestsAdmin = ({ bookings, onFilterChange }: FilterGuestsAdminProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const matchesSearchTerm = (bookings: Booking) => bookings.userId.firstName?.toLowerCase().includes(searchTerm.toLowerCase());

  const filterGuests = () => {
    return bookings.filter((booking) => {
      const matchesSearch = matchesSearchTerm(booking);
      const matchesStatus = statusFilter === '' || statusFilter === 'all' || booking.status.toLowerCase() === statusFilter.toLowerCase();
      return matchesSearch && matchesStatus;
    });
  };
  useEffect(() => {
    const filtered = filterGuests();
    onFilterChange?.(filtered);
  }, [searchTerm, statusFilter, bookings, onFilterChange]);

  const getStatusOptions = () => [
    { item: 'All Ratings', value: 'all' },
    { item: 'Booked', value: 'booked' },
    { item: 'Cancelled', value: 'cancelled' },
    { item: 'Checked', value: 'checked-in' },
  ];

  return (
    <div data-cy="FilterAdmin" className="w-full flex gap-3 mb-6 flex-wrap">
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="Search ..."
          data-testid="search-input"
        />
      </div>
      <SelectFilter placeholder="Status" items={getStatusOptions()} value={statusFilter} onValueChange={setStatusFilter} className="w-[180px]" dataTestId="status-filter" />
    </div>
  );
};

export const matchesSearchTerm = (booking: Booking, searchTerm: string) => {
  return booking.hotelId.name?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false;
};
