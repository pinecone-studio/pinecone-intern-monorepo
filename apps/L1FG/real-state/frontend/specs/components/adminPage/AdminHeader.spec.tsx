import AdminHeader from '@/components/adminPage/AdminHeader';
import { render } from '@testing-library/react';

describe('AdminHeader', () => {
  it('should render successfully ', () => {
    render(<AdminHeader />);
  });
});
