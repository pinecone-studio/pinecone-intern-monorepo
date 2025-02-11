import { NoPrevious } from '@/components/user/booking-page';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('Booked page NoPrevious component', () => {
  it('should render NoPreviousBooking successfully', async () => {
    render(<NoPrevious />);
  });
});
