import { HotelInfo } from '@/components/user/booking-detail/HotelInfo';
import { render } from '@testing-library/react';

describe('HotelInfo page Badge component', () => {
  it('should render badge cancelled component ', () => {
    render(<HotelInfo />);
  });
});
