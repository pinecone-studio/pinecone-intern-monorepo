import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import PreviousBooking from '@/components/main/PrevoiusBooking';
describe(' Previous Booking', () => {
  it('should render the Previous Booking', () => {
    render(<PreviousBooking />);
  });
});
