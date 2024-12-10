import { StartBooking } from '@/components/main';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('Main StartBooking', () => {
  it('should render the main StartBooking', () => {
    render(<StartBooking />);
  });
});
