import React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface HotelSorterProps {
  sortOption: string;
  // eslint-disable-next-line no-unused-vars
  onSortChange: (value: string) => void;
}

export const HotelSorter: React.FC<HotelSorterProps> = ({ sortOption, onSortChange }) => {
  return (
    <Select
      value={sortOption}
      onValueChange={onSortChange}
    >
      <SelectTrigger  className="w-[240px]" 
    data-testid="sort-select"
    >
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem data-testid="Recommended" value="Recommended">Recommended</SelectItem>
          <SelectItem data-testid="PriceLowToHigh" value="Price-LowToHigh">Price: Low to High</SelectItem>
          <SelectItem data-testid="PriceHightoLow" value="Price-HighToLow">Price: High to Low</SelectItem>
          <SelectItem data-testid="StarRating" value="StarRating">Star Rating</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
