import { NoBooking } from '@/components/user/booking-page';
import { render } from '@testing-library/react';

describe('Booking page Badge component', () => {
  it('should render badge cancelled component ', () => {
    render(<NoBooking />);
  });
});
