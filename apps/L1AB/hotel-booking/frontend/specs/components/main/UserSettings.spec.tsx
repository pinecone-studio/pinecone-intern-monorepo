import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { UserSettings } from '@/components/main';
import { useAuth } from '@/components/providers/Auth.Provider';
jest.mock('@/components/providers/Auth.Provider', () => ({
  ...jest.requireActual('@/components/providers/Auth.Provider'),
  useAuth: jest.fn(),
}));
describe('Main User Settings', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue({
      user: {
        email: 'test@example.com',
      },
      signout: jest.fn(),
    });
  });
  it('should render the main user settings', () => {
    render(<UserSettings />);
  });
  it('should render the main user settings  user null', () => {
    (useAuth as jest.Mock).mockReturnValue({ user: null });

    render(<UserSettings />);
  });
});
