import { BookingDetails } from '@/components/main/BookingDetails';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('Main BookingDetails', () => {
  it('should render the main booking Details', () => {
    render(<BookingDetails />);
  });
});
