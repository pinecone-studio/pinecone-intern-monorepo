import AdminPage from '@/components/adminPage/AdminPage';
import { render } from '@testing-library/react';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('AdminPage ', () => {
  it('should render successfully', () => {
    render(
      <>
        <AdminPage posts={[]} />
      </>
    );
  });
});
