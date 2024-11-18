import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { HotelDetails } from '@/components/main';

describe('Main Hotel Details', () => {
  it('should render the main hotel details', () => {
    render(<HotelDetails />);
  });
});
