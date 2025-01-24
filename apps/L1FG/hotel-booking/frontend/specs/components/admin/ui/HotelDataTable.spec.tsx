import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { HotelDataTable } from '@/components/admin/ui';

describe('HotelDataTable', () => {
  it('renders HotelDataTable successfully', () => {
    render(<HotelDataTable />);
  });
});
