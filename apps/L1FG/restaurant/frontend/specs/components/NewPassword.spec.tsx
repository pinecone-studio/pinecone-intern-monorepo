import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import NewPassword from '@/components/NewPassword';
import { useChangePasswordMutation } from '@/generated';
import { useRouter } from 'next/navigation';

jest.mock('@/generated', () => ({
  useChangePasswordMutation: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('NewPassword Component', () => {
  const mockRouter = { push: jest.fn() };
  const mockChangePassword = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useChangePasswordMutation as jest.Mock).mockReturnValue([mockChangePassword, { loading: false }]);
    localStorage.setItem('userId', JSON.stringify('test-user'));
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test('updates input fields correctly', () => {
    render(<NewPassword />);

    const passwordInput = screen.getByTestId('password');
    const rePasswordInput = screen.getByTestId('rePassword');

    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(rePasswordInput, { target: { value: 'password123' } });
  });

  test('retrieves userId from localStorage', async () => {
    render(<NewPassword />);

    await waitFor(() => {
      expect(localStorage.getItem('userId')).toBe(JSON.stringify('test-user'));
    });
  });

  test('shows error if passwords do not match', async () => {
    render(<NewPassword />);

    fireEvent.change(screen.getByTestId('password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByTestId('rePassword'), { target: { value: 'password321' } });
    fireEvent.click(screen.getByTestId('CreateNewPassword'));

    expect(await screen.findByText('Нууц үг таарахгүй байна.'));
  });

  test('calls mutation and redirects on success', async () => {
    mockChangePassword.mockResolvedValue({ data: { changePassword: true } });

    render(<NewPassword />);

    fireEvent.change(screen.getByTestId('password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByTestId('rePassword'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByTestId('CreateNewPassword'));

    await waitFor(() => expect(mockChangePassword).toHaveBeenCalled());
    expect(mockRouter.push).toHaveBeenCalledWith('/done');
  });

  test('shows server error message on failure', async () => {
    mockChangePassword.mockRejectedValue(new Error('Server error'));

    render(<NewPassword />);

    fireEvent.change(screen.getByTestId('password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByTestId('rePassword'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByTestId('CreateNewPassword'));

    expect(await screen.findByText('Серверийн алдаа. Дахин оролдоно уу.'));
  });

  test('redirects if userId is missing', () => {
    localStorage.removeItem('userId');
    render(<NewPassword />);
    fireEvent.click(screen.getByTestId('CreateNewPassword'));

    expect(mockRouter.push).toHaveBeenCalledWith('/reset-password');
  });

  test('button is disabled when loading', () => {
    (useChangePasswordMutation as jest.Mock).mockReturnValue([mockChangePassword, { loading: true }]);
    render(<NewPassword />);

    const button = screen.getByTestId('CreateNewPassword');
    expect(button);
  });
});
