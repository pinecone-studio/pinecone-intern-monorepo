import { CancelBookingContent } from '@/components/user/booking-page';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('Booking cancel page content', () => {
  it('should render BookingCard  successfully', async () => {
    render(<CancelBookingContent />);
  });
});
