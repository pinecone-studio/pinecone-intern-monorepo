import { CheckingBookingLeft } from '@/components/main';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('Main CheckingBookingLeft', () => {
  it('should render the main CheckingBookingLeft', () => {
    render(<CheckingBookingLeft />);
  });
});
