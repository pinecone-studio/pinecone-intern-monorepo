import { NoPreviousBooking } from '@/components/user/booking-page/NoPreviousBooking';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('Booked', () => {
  it('should render NoPreviousBooking successfully', async () => {
    render(<NoPreviousBooking />);
  });
});
