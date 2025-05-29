'use client';

import { useState, useMemo } from 'react';
import { Star, ArrowUpDown } from 'lucide-react';
import { Hotel } from '@/generated';

type SortField = 'starRating' | 'rating';
type SortDirection = 'asc' | 'desc';

interface SortConfig {
  field: SortField | null;
  direction: SortDirection;
}

interface SortableHeaderProps {
  title: string;
  field: SortField;
  sortConfig: SortConfig;
  onSort: (_field: SortField) => void;
}

const SortableHeader = ({ title, field, sortConfig, onSort }: SortableHeaderProps) => {
  const isActive = sortConfig.field === field;
  const rotationClass = isActive && sortConfig.direction === 'desc' ? 'transform rotate-180' : '';
  const colorClass = isActive ? 'text-gray-800' : 'text-gray-400';

  return (
    <th className="text-left bg-white p-4 text-sm font-semibold text-black border border-gray-200">
      <button className="flex items-center gap-1 hover:text-gray-900 transition-colors" onClick={() => onSort(field)} data-testid={`sort-${field}`}>
        {title}
        <ArrowUpDown className={`h-4 w-4 transition-transform ${colorClass} ${rotationClass}`} />
      </button>
    </th>
  );
};

const formatUserRating = (rating: number) => `${rating.toFixed(1)}`;
const generateIndexId = (index: number) => String(index + 1).padStart(4, '0');

const RoomTags = () => (
  <div className="flex gap-1">
    {['Single', 'Deluxe', 'Standard', '+5'].map((roomType) => (
      <span key={roomType} className="px-2 py-1 bg-gray-100 text-black rounded-md text-xs font-medium">
        {roomType}
      </span>
    ))}
  </div>
);

const StarRatingDisplay = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-2">
    <Star size={15} />
    <span className="text-sm text-gray-600">{rating}</span>
  </div>
);

const UserRatingDisplay = ({ rating }: { rating: number }) => (
  <>
    {formatUserRating(rating)}
    <span className="text-gray-500">/10</span>
  </>
);

export const HotelsTable = ({ hotels }: { hotels: Hotel[] }) => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: null,
    direction: 'asc',
  });

  const handleSort = (field: SortField) => {
    const direction = sortConfig.field === field && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ field, direction });
  };

  const handleRowClick = (hotelId: string) => {
    window.location.href = `/hotels/${hotelId}`;
  };

  const getSortValue = (hotel: Hotel, field: SortField | null) => {
    return field === 'starRating' ? hotel.starRating ?? 0 : hotel.rating ?? 0;
  };

  const compareHotels = (a: Hotel, b: Hotel, direction: SortDirection) => {
    const aValue = getSortValue(a, sortConfig.field);
    const bValue = getSortValue(b, sortConfig.field);
    return direction === 'asc' ? aValue - bValue : bValue - aValue;
  };

  const sortedHotels = useMemo(() => {
    if (!sortConfig.field) return hotels;
    return [...hotels].sort((a, b) => compareHotels(a, b, sortConfig.direction));
  }, [hotels, sortConfig]);

  return (
    <div className="w-full overflow-auto bg-white" data-testid="hotels-table">
      <table className="w-full border border-gray-200 border-collapse">
        <thead>
          <tr className="bg-white border-b border-gray-200">
            <th className="text-left p-4 text-sm font-semibold text-black w-20 border border-gray-200">ID</th>
            <th className="text-left p-4 text-sm font-semibold text-black border border-gray-200">Name</th>
            <th className="text-left p-4 text-sm font-semibold text-black w-32 border border-gray-200">Rooms</th>
            <SortableHeader title="Stars Rating" field="starRating" sortConfig={sortConfig} onSort={handleSort} />
            <SortableHeader title="User Rating" field="rating" sortConfig={sortConfig} onSort={handleSort} />
          </tr>
        </thead>
        <tbody>
          {sortedHotels.map((hotel, index) => (
            <tr
              key={hotel._id}
              className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => handleRowClick(hotel._id || '')}
              data-testid={`hotel-row-${index}`}
            >
              <td className="p-4 text-sm text-gray-600 border border-gray-200" data-testid={`hotel-id-${index}`}>
                {generateIndexId(index)}
              </td>
              <td className="p-4 text-sm text-gray-900 font-medium border border-gray-200" data-testid={`hotel-name-${index}`}>
                {hotel.name}
              </td>
              <td className="p-4 border border-gray-200" data-testid={`hotel-rooms-${index}`}>
                <RoomTags />
              </td>
              <td className="p-4 border border-gray-200" data-testid={`hotel-stars-${index}`}>
                <StarRatingDisplay rating={hotel.starRating ?? 0} />
              </td>
              <td className="p-4 text-sm text-gray-900 font-medium border border-gray-200" data-testid={`hotel-rating-${index}`}>
                <UserRatingDisplay rating={hotel.rating ?? 0} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
