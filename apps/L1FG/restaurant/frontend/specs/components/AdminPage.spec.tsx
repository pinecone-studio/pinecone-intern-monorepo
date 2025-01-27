import AdminPage from '@/components/admin-profile/AdminPage';
import { render } from '@testing-library/react';

describe('AdminPage', () => {
  it('Adminpage', async () => {
    render(<AdminPage />);
  });
});
