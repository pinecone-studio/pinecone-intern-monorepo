import { BookingCard } from '@/components/main';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('Main BookingCard', () => {
  it('should render the main BookingCard', () => {
    render(<BookingCard />);
  });
});
