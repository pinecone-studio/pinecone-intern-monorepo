import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { HotelDetailsPolicies } from '@/components/admin/assets/hotel-details';

describe('Admin Hotel Details Policies', () => {
  it('should render the admin hotel details policies', () => {
    render(<HotelDetailsPolicies />);
  });
});
