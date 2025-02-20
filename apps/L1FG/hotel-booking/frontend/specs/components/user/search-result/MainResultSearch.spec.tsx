import { MainResultSearch } from '@/components/user/search-result/MainSearchResult';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { SetStateAction } from 'react';

jest.mock('nuqs', () => ({
  useQueryState: jest.fn(() => [null, jest.fn()]), // Mock хийж байна
}));

describe('MainResultSearch', () => {
  it('should render MainResultSearch successfully', async () => {
    render(
      <MainResultSearch
        data={[]}
        setSearchValuePrice={function (_: 'asc' | 'desc') {
          throw new Error('Function not implemented.');
        }}
        setSelectedRating={function (_: number): void {
          throw new Error('Function not implemented.');
        }}
        setSelectedStar={function (_: number): void {
          throw new Error('Function not implemented.');
        }}
        setSelectedName={function (_: string): void {
          throw new Error('Function not implemented.');
        }}
        setSelectedAmenities={function (_: SetStateAction<string[]>): void {
          throw new Error('Function not implemented.');
        }}
        selectedRating={0}
        selectedStar={null}
        selectedAmenities={[]}
        isLoading={false}
      />
    );
  });
});
