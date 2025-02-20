/* eslint-disable */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import { useLoginUserMutation } from '@/generated';
import { useRouter } from 'next/navigation';
import AdminLogin from '@/components/admin-page-comp/AdminLogin';

jest.mock('@/generated', () => ({
  useLoginUserMutation: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => <img {...props} />,
}));

describe('AdminLogin Component', () => {
  let mockLoginUser;
  let pushMock;

  beforeEach(() => {
    mockLoginUser = jest.fn();
    useLoginUserMutation.mockReturnValue([mockLoginUser, { loading: false, error: null }]);
    pushMock = jest.fn();
    useRouter.mockReturnValue({ push: pushMock });
    localStorage.clear();
  });

  test('renders login form correctly', () => {
    render(<AdminLogin />);

    expect(screen.getByPlaceholderText('Имэйл хаяг')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Нууц үг')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Нэвтрэх' })).toBeInTheDocument();
  });

  test('allows user to input email and password', () => {
    render(<AdminLogin />);

    const emailInput = screen.getByPlaceholderText('Имэйл хаяг');
    const passwordInput = screen.getByPlaceholderText('Нууц үг');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  test('calls login mutation and redirects on success', async () => {
    mockLoginUser.mockResolvedValue({ data: { loginUser: { _id: '12345' } } });
    render(<AdminLogin />);

    fireEvent.change(screen.getByPlaceholderText('Имэйл хаяг'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Нууц үг'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: 'Нэвтрэх' }));

    await waitFor(() => {
      expect(mockLoginUser).toHaveBeenCalledWith({ variables: { input: { email: 'test@example.com', password: 'password123' } } });
      expect(localStorage.getItem('token')).toBe('12345');
      expect(pushMock).toHaveBeenCalledWith('/admin/dashboard');
    });
  });

  test('handles case when loginUser returns undefined data', async () => {
    // This covers line 24 - the if condition check for response.data?.loginUser
    mockLoginUser.mockResolvedValue({ data: undefined });
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(<AdminLogin />);

    fireEvent.change(screen.getByPlaceholderText('Имэйл хаяг'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Нууц үг'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: 'Нэвтрэх' }));

    await waitFor(() => {
      expect(mockLoginUser).toHaveBeenCalled();
      expect(localStorage.getItem('token')).toBeNull();
      expect(pushMock).not.toHaveBeenCalled();
    });

    consoleErrorSpy.mockRestore();
  });

  test('displays error message on login failure', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    mockLoginUser.mockRejectedValue(new Error('Invalid credentials'));

    render(<AdminLogin />);

    fireEvent.change(screen.getByPlaceholderText('Имэйл хаяг'), { target: { value: 'wrong@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Нууц үг'), { target: { value: 'wrongpassword' } });
    fireEvent.click(screen.getByRole('button', { name: 'Нэвтрэх' }));

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalled();
      expect(consoleErrorSpy.mock.calls[0][0]).toBe('Login error:');
    });

    consoleErrorSpy.mockRestore();
  });

  test('displays loading state during login attempt', async () => {
    // This tests line 49 - the conditional rendering based on loading state
    useLoginUserMutation.mockReturnValue([mockLoginUser, { loading: true, error: null }]);
    mockLoginUser.mockResolvedValue({ data: { loginUser: { _id: '12345' } } });

    render(<AdminLogin />);

    // Check button is in loading state and disabled
    expect(screen.getByRole('button')).toHaveTextContent('Түр хүлээнэ үү...');
    expect(screen.getByRole('button')).toBeDisabled();
  });

  test('displays error message when API returns an error', async () => {
    // This tests error display in the JSX
    useLoginUserMutation.mockReturnValue([mockLoginUser, { loading: false, error: { message: 'Authentication failed' } }]);

    const { container } = render(<AdminLogin />);

    // Check if error message is displayed
    expect(screen.getByText('Нууц үг эсвэл Имэйл буруу')).toBeInTheDocument();
    expect(container.querySelector('.text-red-500')).toBeInTheDocument();
  });
});
