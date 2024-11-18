import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { FilterHotels } from '@/components/main';

describe('Main Filter Hotels', () => {
  it('should render the main filter hotels', () => {
    render(<FilterHotels />);
  });
});
