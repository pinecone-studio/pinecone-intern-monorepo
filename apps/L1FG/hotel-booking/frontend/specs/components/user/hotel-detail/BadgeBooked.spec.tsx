import { BadgeBooked } from '@/components/user/booking-page';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('BadgeBooked', () => {
  it('should render BadgeBooked successfully', async () => {
    render(<BadgeBooked />);
  });
});
