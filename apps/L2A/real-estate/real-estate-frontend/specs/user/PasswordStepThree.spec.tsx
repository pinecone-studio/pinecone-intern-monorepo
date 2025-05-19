import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { PasswordStepThree } from '@/app/forget-password/_components/PasswordStepThree';
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const mockResetPassword = jest.fn();

jest.mock('@/generated', () => ({
  useResetPasswordMutation: () => [mockResetPassword, { loading: false }],
}));

describe('PasswordStepThree', () => {
  const push = jest.fn();
  const refresh = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push, refresh });
    localStorage.clear();
  });

  it('renders form inputs and button', () => {
    render(<PasswordStepThree email="test@example.com" />);
    expect(screen.getByTestId('new-password')).toBeInTheDocument();
    expect(screen.getByTestId('confirm-password')).toBeInTheDocument();
    expect(screen.getByTestId('reset-submit')).toBeInTheDocument();
  });

  it('shows error if passwords do not match', () => {
    render(<PasswordStepThree email="test@example.com" />);
    fireEvent.change(screen.getByTestId('new-password'), { target: { value: 'abc123' } });
    fireEvent.change(screen.getByTestId('confirm-password'), { target: { value: 'abc321' } });
    fireEvent.click(screen.getByTestId('reset-submit'));
    expect(screen.getByTestId('reset-error')).toHaveTextContent('Passwords do not match');
  });

  it('shows error if password is too short', () => {
    render(<PasswordStepThree email="test@example.com" />);
    fireEvent.change(screen.getByTestId('new-password'), { target: { value: '123' } });
    fireEvent.change(screen.getByTestId('confirm-password'), { target: { value: '123' } });
    fireEvent.click(screen.getByTestId('reset-submit'));
    expect(screen.getByTestId('reset-error')).toHaveTextContent('at least 6 characters');
  });

  it('resets password and redirects', async () => {
    mockResetPassword.mockResolvedValueOnce({ data: { resetPassword: { token: 'mock-token' } } });

    render(<PasswordStepThree email="test@example.com" />);
    fireEvent.change(screen.getByTestId('new-password'), { target: { value: 'newpass123' } });
    fireEvent.change(screen.getByTestId('confirm-password'), { target: { value: 'newpass123' } });
    fireEvent.click(screen.getByTestId('reset-submit'));

    await waitFor(() => {
      expect(mockResetPassword).toHaveBeenCalledWith({
        variables: { email: 'test@example.com', password: 'newpass123' },
      });
      expect(localStorage.getItem('token')).toBe('mock-token');
      expect(push).toHaveBeenCalledWith('/');
      expect(refresh).toHaveBeenCalled();
    });
  });

  it('shows error if resetPassword fails (rejected)', async () => {
    mockResetPassword.mockRejectedValueOnce(new Error('Oops'));

    render(<PasswordStepThree email="test@example.com" />);
    fireEvent.change(screen.getByTestId('new-password'), { target: { value: 'newpass123' } });
    fireEvent.change(screen.getByTestId('confirm-password'), { target: { value: 'newpass123' } });
    fireEvent.click(screen.getByTestId('reset-submit'));

    await waitFor(() => {
      expect(screen.getByTestId('reset-error')).toHaveTextContent('Failed to reset password. Try again.');
    });
  });

  it('shows error if resetPassword succeeds but returns null', async () => {
    mockResetPassword.mockResolvedValueOnce({ data: { resetPassword: null } });

    render(<PasswordStepThree email="test@example.com" />);
    fireEvent.change(screen.getByTestId('new-password'), { target: { value: 'newpass123' } });
    fireEvent.change(screen.getByTestId('confirm-password'), { target: { value: 'newpass123' } });
    fireEvent.click(screen.getByTestId('reset-submit'));

    await waitFor(() => {
      expect(screen.getByTestId('reset-error')).toHaveTextContent('Failed to reset password. Try again.');
    });
  });

  it('sets empty token if resetPassword token is undefined', async () => {
    mockResetPassword.mockResolvedValueOnce({ data: { resetPassword: { token: undefined } } });

    render(<PasswordStepThree email="test@example.com" />);
    fireEvent.change(screen.getByTestId('new-password'), { target: { value: 'newpass123' } });
    fireEvent.change(screen.getByTestId('confirm-password'), { target: { value: 'newpass123' } });
    fireEvent.click(screen.getByTestId('reset-submit'));

    await waitFor(() => {
      expect(localStorage.getItem('token')).toBe('');
    });
  });

  it('sets empty token if resetPassword result is undefined', async () => {
    mockResetPassword.mockResolvedValueOnce(undefined);

    render(<PasswordStepThree email="test@example.com" />);
    fireEvent.change(screen.getByTestId('new-password'), { target: { value: 'newpass123' } });
    fireEvent.change(screen.getByTestId('confirm-password'), { target: { value: 'newpass123' } });
    fireEvent.click(screen.getByTestId('reset-submit'));

    await waitFor(() => {
      expect(localStorage.getItem('token')).toBe('');
      expect(screen.getByTestId('reset-error')).toHaveTextContent('Failed to reset password. Try again.');
    });
  });

  it('shows loading state in submit button when testLoading is true', () => {
    render(<PasswordStepThree email="test@example.com" testLoading={true} />);
    const btn = screen.getByTestId('reset-submit');
    expect(btn).toBeDisabled();
    expect(btn).toHaveTextContent('Resetting...');
  });
});
