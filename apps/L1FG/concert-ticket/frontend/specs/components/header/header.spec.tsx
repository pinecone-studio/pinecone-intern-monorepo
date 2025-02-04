import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { HeaderPart } from '@/components/header/Header';
import { useAuth } from '@/components/providers/AuthProvider';

// Mocking the `useAuth` hook
jest.mock('@/components/providers/AuthProvider', () => ({
  useAuth: jest.fn(),
}));

describe('HeaderPart', () => {
  it('should render header with login and signup buttons when user is not logged in', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      logout: jest.fn(),
    });

    render(<HeaderPart />);

    // Assert login/signup buttons are present
    expect(screen.getByText('Нэвтрэх')).toBeInTheDocument();
    expect(screen.getByText('Бүртгүүлэх')).toBeInTheDocument();
  });

  it('should render email and logout button when user is logged in', () => {
    const mockLogout = jest.fn();
    (useAuth as jest.Mock).mockReturnValue({
      user: { email: 'test@example.com' },
      logout: mockLogout,
    });

    render(<HeaderPart />);

    // Assert that email and logout button are present
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();

    // Simulate logout button click
    fireEvent.click(screen.getByText('Logout'));
    expect(mockLogout).toHaveBeenCalledTimes(1);
  });
});
