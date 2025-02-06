import AdminAuth from '@/components/admin-profile/AdminAuth';
import { render } from '@testing-library/react';

window.ResizeObserver =
  window.ResizeObserver ||
  jest.fn().mockImplementation(() => ({
    disconnect: jest.fn(),
    observe: jest.fn(),
    unobserve: jest.fn(),
  }));
describe('AdminAuth', () => {
  it('AdminAuth', async () => {
    render(<AdminAuth />);
  });
});
