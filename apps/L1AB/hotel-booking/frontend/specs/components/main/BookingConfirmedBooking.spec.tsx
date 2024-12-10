import { BookingConfirmedBooking } from '@/components/main';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('Main BookingConfirmed', () => {
  it('should render the main BookingConfirmed', () => {
    render(<BookingConfirmedBooking />);
  });
});
