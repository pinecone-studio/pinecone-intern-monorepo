import '@testing-library/jest-dom';
import { Booking } from '@/components/main/Booking';
import { render } from '@testing-library/react';

describe('Booking', () => {
  it('should render the booking', () => {
    render(<Booking />);
  });
});
