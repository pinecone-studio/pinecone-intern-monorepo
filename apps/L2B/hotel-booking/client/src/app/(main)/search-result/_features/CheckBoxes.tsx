// components/CheckBoxes.tsx
'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface CheckBoxesProps {
  filters: {
    rating: number[];
    stars: number[];
    amenities: string[];
  };
  onFilterChange: (_type: 'rating' | 'stars' | 'amenities', _value: number | string) => void;
}

export const CheckBoxes = ({ filters, onFilterChange }: CheckBoxesProps) => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-5">
        <Label>Rating</Label>
        {[9, 8, 7].map((rating) => (
          <div key={rating} className="flex items-center gap-3">
            <Checkbox
              checked={filters.rating.includes(rating)}
              onCheckedChange={(_checked) => onFilterChange('rating', rating)}
              className="data-[state=checked]:bg-[#2563EB] data-[state=checked]:border-none"
              id={`rating-${rating}`}
            />
            <Label>{rating === 9 ? `+${rating}` : `+${rating}`}</Label>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-5">
        <Label>Stars</Label>
        {[5, 4, 3, 2, 1].map((stars) => (
          <div key={stars} className="flex items-center gap-3">
            <Checkbox
              checked={filters.stars.includes(stars)}
              onCheckedChange={(_checked) => onFilterChange('stars', stars)}
              className="data-[state=checked]:bg-[#2563EB] data-[state=checked]:border-none"
              id={`stars-${stars}`}
            />
            <Label>{stars} stars</Label>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-5">
        <Label>Amenities</Label>
        {['free-wifi', 'free-parking', 'pool'].map((amenity) => (
          <div key={amenity} className="flex items-center gap-3">
            <Checkbox
              checked={filters.amenities.includes(amenity)}
              onCheckedChange={(_checked) => onFilterChange('amenities', amenity)}
              className="data-[state=checked]:bg-[#2563EB] data-[state=checked]:border-none rounded-sm"
              id={amenity}
            />
            <Label>{amenity === 'free-wifi' ? 'Free-wifi' : amenity === 'free-parking' ? 'Free-parking' : 'Pool'}</Label>
          </div>
        ))}
      </div>
    </div>
  );
};
