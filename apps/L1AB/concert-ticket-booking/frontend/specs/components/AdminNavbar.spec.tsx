import { AdminNavbar } from '@/components/providers/AdminNavbar';
import { render } from '@testing-library/react';

describe('AdminNavbar', () => {
  it('should render successfully', () => {
    render(<AdminNavbar />);
  });
});
