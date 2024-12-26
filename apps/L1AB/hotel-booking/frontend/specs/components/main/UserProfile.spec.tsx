import { UserProfile } from '@/components/main';
import { useAuth } from '@/components/providers/Auth.Provider';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

jest.mock('@/components/providers/Auth.Provider', () => ({
  ...jest.requireActual('@/components/providers/Auth.Provider'),
  useAuth: jest.fn(),
}));

describe('Main User Profile', () => {
  jest.clearAllMocks();
  (useAuth as jest.Mock).mockReturnValue({
    user: {
      email: 'test@example.com',
    },
    signout: jest.fn(),
  });
  it('should render the main user profile', () => {
    render(<UserProfile />);
  });
});
