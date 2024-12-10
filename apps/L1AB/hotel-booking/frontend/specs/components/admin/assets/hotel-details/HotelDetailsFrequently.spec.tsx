import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { HotelDetailsFrequently } from '@/components/admin/assets/hotel-details';

describe('Admin Hotel Details Frequently', () => {
  it('should render the admin hotel details frequently', () => {
    render(<HotelDetailsFrequently />);
  });
});
