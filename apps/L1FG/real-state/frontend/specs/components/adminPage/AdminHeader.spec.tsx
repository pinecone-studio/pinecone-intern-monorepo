import AdminHeader from '@/components/adminPage/AdminHeader';
import { render } from '@testing-library/react';

describe('Admin Header Tests', () => {
  it('should render AdminHeader', () => {
    render(<AdminHeader />);
  });
});
