import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { UpcomingBooking } from '@/components/admin/ui/add-hotel';

describe('UpcomingBooking Component', () => {
  it('renders UpcomingBooking successfully', () => {
    render(<UpcomingBooking />);
  });
});
