import { BookingDetailBooked } from '@/components/main';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('Main BookingDetailBooked', () => {
  it('should render the main BookingDetailBooked', () => {
    render(<BookingDetailBooked />);
  });
});
