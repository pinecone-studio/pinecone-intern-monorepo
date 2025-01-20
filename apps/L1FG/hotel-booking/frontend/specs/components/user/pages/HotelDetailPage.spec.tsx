import { HotelDetailPage } from '@/components/user/pages/hoteldetail-page';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('HotelDetailPage', () => {
  it('should render successfully', async () => {
    render(<HotelDetailPage />);
  });
});
