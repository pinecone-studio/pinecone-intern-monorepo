import { NoPreviousBooking } from '@/components/main';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('Main NoPreviousBooking', () => {
  it('should render the main NoPreviousBooking', () => {
    render(<NoPreviousBooking />);
  });
});
