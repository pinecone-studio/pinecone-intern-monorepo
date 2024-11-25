import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { HotelDetailsLocation } from '@/components/admin/assets/hotel-details';

describe('Admin Hotel Details Location', () => {
  it('should render the admin hotel details location', () => {
    render(<HotelDetailsLocation location="New York, USA" />);
  });
  it('should render the admin hotel details location with default location', () => {
    render(<HotelDetailsLocation />);
  });
});
