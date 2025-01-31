import { BookingCard } from '@/components/user/booking-page/BookingCard';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('Booked', () => {
  it('should render BookingCard  successfully', async () => {
    render(<BookingCard />);
  });
});
