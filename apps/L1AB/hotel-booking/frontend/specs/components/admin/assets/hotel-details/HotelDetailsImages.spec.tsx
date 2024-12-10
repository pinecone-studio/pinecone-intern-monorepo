import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { HotelDetailsImages } from '@/components/admin/assets/hotel-details';

describe('Admin Hotel Details Images', () => {
  it('should render the admin hotel details images', () => {
    render(<HotelDetailsImages />);
  });
  it('should render the admin hotel details images with no images', () => {
    render(<HotelDetailsImages images={[]} />);
  });
});
