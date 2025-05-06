import { render, screen, act } from '@testing-library/react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import Header from '@/app/_components/Header';
import '@testing-library/jest-dom';

jest.mock('@/components/ui/dropdown-menu', () => ({
  DropdownMenu: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  DropdownMenuTrigger: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  DropdownMenuContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  DropdownMenuLabel: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  DropdownMenuSeparator: () => <div />,
  DropdownMenuCheckboxItem: ({ children, onClick }: { children: React.ReactNode, onClick: () => void }) => (
    <div onClick={onClick} data-testid="logout-button">{children}</div>
  ),
}));

jest.mock('@/hooks/useAuth');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('Header component', () => {
  const mockRefresh = jest.fn();
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ 
      refresh: mockRefresh,
      push: jest.fn() 
    });
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('renders correctly for unauthenticated users', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      isLoggedIn: false,
      loading: false
    });
    render(<Header />);
    expect(screen.getByText('Home Vault')).toBeInTheDocument();
    expect(screen.getByText('Бүртгүүлэх')).toBeInTheDocument();
    expect(screen.getByText('Нэвтрэх')).toBeInTheDocument();
    expect(screen.getByText('+ Зар оруулах')).toBeInTheDocument();
  });

  it('renders correctly for authenticated users', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: { email: 'test@example.com' },
      isLoggedIn: true,
      loading: false
    });
    render(<Header />);
    expect(screen.getByRole('button', { name: /test@example.com/i })).toBeInTheDocument();
    expect(screen.getByText('Миний зарууд')).toBeInTheDocument();
    expect(screen.queryByText('Бүртгүүлэх')).not.toBeInTheDocument();
    expect(screen.queryByText('Нэвтрэх')).not.toBeInTheDocument();
  });

  it('handles logout correctly', async () => {
    localStorage.setItem('token', 'test-token');
    localStorage.setItem('email', 'test@example.com');
    (useAuth as jest.Mock).mockReturnValue({
      user: { email: 'test@example.com' },
      isLoggedIn: true,
      loading: false,
      logout: jest.fn()
    });
    render(<Header />);
    await act(async () => {
      screen.getByTestId('logout-button').click();
    });
    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('email')).toBeNull();
    expect(mockRefresh).toHaveBeenCalled();
  });

  it('shows loading state correctly', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      isLoggedIn: false,
      loading: true
    });
    render(<Header />);    
    expect(screen.getByText('+ Зар оруулах')).toBeInTheDocument();
    expect(screen.queryByText('Бүртгүүлэх')).not.toBeInTheDocument();
    expect(screen.queryByText('Нэвтрэх')).not.toBeInTheDocument();
    expect(screen.queryByText('Миний зарууд')).not.toBeInTheDocument();
  });
});