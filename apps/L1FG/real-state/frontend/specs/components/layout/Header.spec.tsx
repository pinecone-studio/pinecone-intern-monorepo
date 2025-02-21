import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import { useAuth } from '@/components/providers';

// Mocking dependencies
jest.mock('@/components/providers', () => ({
  useAuth: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('Header Component', () => {
  const mockSignout = jest.fn();
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  test('renders correctly for a guest user', () => {
    (useAuth as jest.Mock).mockReturnValue({ user: null });

    render(<Header />);

    expect(screen.getByText('Зарагдаж буй газрууд')).toBeInTheDocument();
    expect(screen.getByText('Зар Оруулах')).toBeInTheDocument();
    expect(screen.getByText('Нэвтрэх')).toBeInTheDocument();
  });

  test('renders correctly for a normal logged-in user', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: { name: 'Test User', isAdmin: false },
      signout: mockSignout,
    });

    render(<Header />);
  });

  test('renders correctly for an admin user', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: { name: 'Admin User', isAdmin: true },
      signout: mockSignout,
    });

    render(<Header />);

    expect(screen.getByText('admin')).toBeInTheDocument();
    expect(screen.queryByText('Нэвтрэх')).not.toBeInTheDocument();
  });

  test('calls signout function when "Тийм" button is clicked', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: { name: 'Test User', isAdmin: false },
      signout: mockSignout,
    });

    render(<Header />);

    fireEvent.click(screen.getByText('Test User')); // Opens dialog
    fireEvent.click(screen.getByText('Тийм')); // Clicks logout button

    expect(mockSignout).toHaveBeenCalled();
  });
});
