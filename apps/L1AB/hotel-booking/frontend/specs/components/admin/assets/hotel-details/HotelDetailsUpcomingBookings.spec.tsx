import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { HotelDetailsUpcomingBookings } from '@/components/admin/assets/hotel-details';

describe('Admin Hotel Details Upcoming Bookings', () => {
  it('should render the admin hotel details upcoming bookings', () => {
    render(<HotelDetailsUpcomingBookings />);
  });
});
