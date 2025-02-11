import { MainContentBooking } from '@/components/user/booking-page';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('MainContentBooking page cpmponent', () => {
  it('should render Booked successfully', async () => {
    render(<MainContentBooking />);
  });
});
