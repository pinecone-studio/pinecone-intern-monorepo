import { useAuth } from '@/components/providers';
import { NavigationWhite } from '@/components/user/main/NavigationWhite';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

jest.mock('@/components/providers', () => ({
  useAuth: jest.fn(),
}));

describe('NavigationWhite', () => {
  it('should render successfully when user is logged in', async () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: { name: 'John Doe', email: 'test@example.com' },
      signout: jest.fn(),
    });

    render(<NavigationWhite />);

    expect(screen.getByText('My Booking'));
  });

  it('should render successfully when user is not logged in', async () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      signout: jest.fn(),
    });

    render(<NavigationWhite />);

    expect(screen.getByText('Register'));
    expect(screen.getByText('Sign in'));
  });
});
