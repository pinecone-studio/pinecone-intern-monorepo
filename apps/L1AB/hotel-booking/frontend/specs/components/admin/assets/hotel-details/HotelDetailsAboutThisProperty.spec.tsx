import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { HotelDetailsAboutThisProperty } from '@/components/admin/assets/hotel-details';

describe('Admin Hotel Details About This Property', () => {
  it('should render the admin hotel details about this property', () => {
    render(<HotelDetailsAboutThisProperty />);
  });
});
