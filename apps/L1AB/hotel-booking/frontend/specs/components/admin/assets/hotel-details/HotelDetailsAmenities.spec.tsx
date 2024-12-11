import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { HotelDetailsAmenities } from '@/components/admin/assets/hotel-details';

describe('Admin Hotel Details Amenities', () => {
  it('should render the admin hotel details amenities', () => {
    render(<HotelDetailsAmenities />);
  });
});
