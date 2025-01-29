import AdminPage from '@/components/adminPage/AdminPage';
import { render } from '@testing-library/react';

describe('Admin Page Tests', () => {
  it('should render AdminPage', () => {
    render(<AdminPage />);
  });
});
