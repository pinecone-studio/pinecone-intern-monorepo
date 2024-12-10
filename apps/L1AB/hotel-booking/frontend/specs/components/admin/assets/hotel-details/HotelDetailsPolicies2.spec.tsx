import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { HotelDetailsPolicies2 } from '@/components/admin/assets/hotel-details';

describe('Admin Hotel Details Policies2', () => {
  it('should render the admin hotel details policies2', () => {
    render(<HotelDetailsPolicies2 />);
  });
});
