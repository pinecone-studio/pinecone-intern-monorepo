import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Header } from '@/components/main';
import { useAuth } from '@/components/providers/Auth.Provider';
jest.mock('@/components/providers/Auth.Provider', () => ({
  ...jest.requireActual('@/components/providers/Auth.Provider'),
  useAuth: jest.fn(),
}));
describe('Main Header', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue({
      user: {
        email: 'test@example.com',
      },
    });
  });
  it('should render the main header', () => {
    render(<Header />);
  });
});
