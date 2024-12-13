import { BookingDetailRoom } from '@/components/main';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('Main BookingDetailRoom', () => {
  it('should render the main BookingDetailRoom', () => {
    render(<BookingDetailRoom />);
  });
});
