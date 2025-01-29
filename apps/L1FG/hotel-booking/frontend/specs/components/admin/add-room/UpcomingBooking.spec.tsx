import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { UpcomingBooking } from '@/components/admin/add-room';

describe('UpcomingBooking Component', () => {
  it('renders UpcomingBooking successfully', () => {
    render(<UpcomingBooking />);
  });
});
