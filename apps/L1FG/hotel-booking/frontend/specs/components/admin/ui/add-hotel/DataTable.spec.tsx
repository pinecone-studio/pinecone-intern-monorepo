import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { UpcomingBookingTable } from '@/components/admin/ui/add-hotel';

describe('DataTable', () => {
  it('renders DataTable successfully', () => {
    render(<UpcomingBookingTable />);
  });
});
