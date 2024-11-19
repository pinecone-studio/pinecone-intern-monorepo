import { AdminPagination } from '@/components';
import { render } from '@testing-library/react';

describe('AdminDashPagination', () => {
  it('should render successfully', () => {
    render(<AdminPagination />);
  });
});
