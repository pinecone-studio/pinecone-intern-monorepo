import { BadgeCompleted } from '@/components/user/booking-page';
import { render } from '@testing-library/react';

describe('Booking page bsdge', () => {
  it('Badge Comloted component render', async () => {
    render(<BadgeCompleted />);
  });
});
