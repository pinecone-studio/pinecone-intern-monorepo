import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { HeaderPart } from '@/components/header/Header';
import { useAuth } from '@/components/providers/AuthProvider';

jest.mock('@/components/providers/AuthProvider', () => ({
  useAuth: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn,
  }),
}));
describe('HeaderPart', () => {
  beforeEach(() => localStorage.clear());

  it('should render email and logout button when user is logged in', () => {
    localStorage.setItem('user', JSON.stringify({ _id: '1' }));

    const mockLogout = jest.fn();

    (useAuth as jest.Mock).mockReturnValue({
      user: { email: 'test@example.com' },
      logout: mockLogout,
    });


     render(<HeaderPart />);


    fireEvent.click(screen.getByText('Logout'));
    expect(mockLogout).toHaveBeenCalledTimes(1);
  });
  it('should render email and orderpage click button', () => {
    localStorage.setItem('user', JSON.stringify({ _id: '1' }));

    const mockLogout = jest.fn();

    (useAuth as jest.Mock).mockReturnValue({
      user: { email: 'test@example.com' },
      logout: mockLogout,
    });

    const { getByTestId } = render(<HeaderPart />);


    fireEvent.click(getByTestId('header-order-page'));
    expect(getByTestId('header-order-page')).toBeDefined();
  });
  it('should render signup click button', () => {
    const mockLogout = jest.fn();

    (useAuth as jest.Mock).mockReturnValue({
      logout: mockLogout,
    });

    const { getByTestId } = render(<HeaderPart />);

    fireEvent.click(getByTestId('sign-up'));
    fireEvent.click(getByTestId('sign-in'));
    expect(screen.getByText('Нэвтрэх')).toBeInTheDocument();
    expect(screen.getByText('Бүртгүүлэх')).toBeInTheDocument();
  });

});
