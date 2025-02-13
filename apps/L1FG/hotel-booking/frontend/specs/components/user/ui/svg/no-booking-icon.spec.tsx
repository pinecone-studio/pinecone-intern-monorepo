import { NobookingIcon } from '@/components/user/ui/svg/NoBookingIcon';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('Booked page NobookingIcon svg component', () => {
  it('should render NoPreviousBooking successfully', async () => {
    render(<NobookingIcon />);
  });
});
