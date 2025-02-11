import { Dispatch, SetStateAction } from 'react';
import { LeftNavbar } from '../../../features/user/search-result/LeftNavbar';
import { RightNavbar } from './RightNavbar';
import { Hotel } from '@/generated';

interface MainResultSearchProps {
  data: Array<Hotel | null>;
  setSearchValuePrice: (_: 'asc' | 'desc') => void;
  setSelectedRating: (_: number) => void;
  setSelectedStar: (_: number) => void;
  setSelectedName: (_: string) => void;
  setSelectedAmenities: Dispatch<SetStateAction<Array<string>>>;
  selectedRating: number;
  selectedStar: number | null;
  selectedAmenities: string[];
}

export const MainResultSearch = ({
  data,
  setSearchValuePrice,
  setSelectedRating,
  setSelectedStar,
  setSelectedAmenities,
  setSelectedName,
  selectedRating,
  selectedStar,
  selectedAmenities,
}: MainResultSearchProps) => {
  return (
    <div>
      <div className="container mx-auto flex gap-[48px] px-[60px] py-[32px] justify-center">
        <LeftNavbar
          setSelectedName={setSelectedName}
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
