import { Reservation } from '@/components/user/booking-detail/Reservation';
import { render } from '@testing-library/react';

describe('Reservation page Badge component', () => {
  it('should render badge cancelled component ', () => {
    render(<Reservation />);
  });
});
