import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { UpcomingBooking } from '@/components/admin/hotel-detail';

describe('UpcomingBooking', () => {
  it('renders UpcomingBooking successfully', () => {
    render(<UpcomingBooking />);
  });
});
