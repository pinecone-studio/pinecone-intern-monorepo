import { HotelDetailMain } from '@/components/user/hotel-detail/HotelDetailMain';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

jest.mock('nuqs', () => ({
  useQueryState: jest.fn(() => [null, jest.fn()]), // Mock хийж байна
}));

describe('HotelDetailMain', () => {
  it('should render HotelDetailMain successfully', async () => {
    render(<HotelDetailMain />);
  });
});
