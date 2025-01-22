import { HotelDetailMain } from '@/components/user/hotel-detail/HotelDetailMain';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('HotelDetailMain', () => {
  it('should render HotelDetailMain successfully', async () => {
    render(<HotelDetailMain />);
  });
});
