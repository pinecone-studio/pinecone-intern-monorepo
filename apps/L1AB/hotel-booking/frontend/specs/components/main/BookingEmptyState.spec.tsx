import BookingEmptyState from '@/components/main/BookingEmptyState';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('Booking Empty state', () => {
  it('should render the Bookingt Empty state', () => {
    render(<BookingEmptyState />);
  });
});
