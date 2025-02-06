import { Dispatch, SetStateAction } from 'react';
import { LeftNavbar } from '../../../features/user/search-result/LeftNavbar';
import { RightNavbar } from './RightNavbar';
import { Hotel } from '@/generated';

interface MainResultSearchProps {
  data: Array<Hotel | null>;
  setSearchValuePrice: (_: 'asc' | 'desc') => void;
  setSelectedRating: (_: number | null) => void;
  setSelectedStar: (_: number | null) => void;
  setSelectedAmenities: Dispatch<SetStateAction<Array<string>>>;
  selectedRating: number | null;
  selectedStar: number | null;
  selectedAmenities: string[];
}

export const MainResultSearch = ({ data, setSearchValuePrice, setSelectedRating, setSelectedStar, setSelectedAmenities, selectedRating, selectedStar, selectedAmenities }: MainResultSearchProps) => {
  return (
    <div>
      <div className="container mx-auto flex gap-[48px] px-[60px] py-[32px] justify-center">
        <LeftNavbar
          setSelectedRating={setSelectedRating}
          setSelectedStar={setSelectedStar}
          setSelectedAmenities={setSelectedAmenities}
          selectedRating={selectedRating}
          selectedStar={selectedStar}
          selectedAmenities={selectedAmenities}
        />
        <RightNavbar data={data} setSearchValuePrice={setSearchValuePrice} />
      </div>
    </div>
  );
};
