import { Checkbox } from '@/components/ui/checkbox';
import { Dispatch, SetStateAction } from 'react';

interface LeftNavbarProps {
  setSelectedRating: (_: number | null) => void;
  setSelectedStar: (_: number | null) => void;
  setSelectedAmenities: Dispatch<SetStateAction<Array<string>>>;
  selectedRating: number | null;
  selectedStar: number | null;
  selectedAmenities: string[];
}

export const LeftNavbar = ({ setSelectedRating, setSelectedStar, setSelectedAmenities, selectedRating, selectedStar, selectedAmenities }: LeftNavbarProps) => {
  const handleSelectRating = (ratingValue: number) => {
    setSelectedRating(selectedRating === ratingValue ? null : ratingValue);
  };

  const handleSelectStar = (starValue: number) => {
    setSelectedStar(selectedStar === starValue ? null : starValue);
  };

  const handleSelectAmenities = (amenitiesValue: string) => {
    setSelectedAmenities((prevSelectedAmenities) =>
      prevSelectedAmenities.includes(amenitiesValue) ? prevSelectedAmenities.filter((amenity) => amenity !== amenitiesValue) : [...prevSelectedAmenities, amenitiesValue]
    );
  };

  const ratingNumber = [9, 8, 7];
  const starNumber = [5, 4, 3, 2, 1];
  const amenitiesValue = ['Pet friendly', 'Airport shuttle included', 'Pool'];

  console.log(selectedRating, 'selectedRating');
  console.log(selectedStar, 'selectedStar');
  console.log(selectedAmenities, 'selectedAmenities');

  return (
    <div className="w-[240px] flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <p className="text-[14px] leading-[20px] font-[500]">Search by property name</p>
        <input className="w-full h-[40px] px-3 py-2 rounded-md border border-[#E4E4E7]" type="text" placeholder="Search" />
      </div>
      <div className="w-full border-[0.5px] border-[#E4E4E7] mt-4 mb-4"></div>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-[20px]">
          <p className="text-[14px] leading-[14px] font-[500]">Rating</p>
          {ratingNumber.map((rating) => (
            <div key={rating + '3'} className="flex gap-4 items-center">
              <Checkbox data-testid={`rating-${rating}`} checked={selectedRating === rating} onCheckedChange={(checked) => checked && handleSelectRating(rating)} />
              <label className="text-[14px] leading-[14px] font-[500]">+{rating}</label>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-[20px]">
          <p className="text-[14px] leading-[14px] font-[500]">Stars</p>
          {starNumber.map((star) => (
            <div key={star + 'e'} className="flex gap-4 items-center">
              <Checkbox checked={selectedStar === star} onCheckedChange={(checked) => checked && handleSelectStar(star)} />
              <label className="text-[14px] leading-[14px] font-[500]">{star} stars</label>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-[20px]">
          <p className="text-[14px] leading-[14px] font-[500]">Amenities</p>
          {amenitiesValue.map((amenities) => (
            <div key={amenities} className="flex gap-4 items-center">
              <Checkbox id={amenities} className="rounded-sm" onCheckedChange={(checked) => checked && handleSelectAmenities(amenities)} />
              <label htmlFor={amenities} className="text-[14px] leading-[14px] font-[500]">
                {amenities}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
