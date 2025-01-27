import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { GuestDataTable } from '@/components/admin/ui';

describe('GuestDataTable', () => {
  it('renders GuestDataTable successfully', () => {
    render(<GuestDataTable />);
  });
});
