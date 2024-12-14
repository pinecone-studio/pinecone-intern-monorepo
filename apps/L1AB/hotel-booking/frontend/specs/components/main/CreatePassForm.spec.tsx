import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { usePasswordChangeMutation } from '@/generated';
import { CreatePassForm } from '@/components/main';
import '@testing-library/jest-dom';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/generated', () => ({
  usePasswordChangeMutation: jest.fn(),
}));

describe('CreatePassForm', () => {
  const mockRouterPush = jest.fn();
  const mockPasswordChangeMutation = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
    (usePasswordChangeMutation as jest.Mock).mockReturnValue([mockPasswordChangeMutation, { loading: false, error: null }]);
    jest.clearAllMocks();
  });

  it('renders the component correctly', () => {
    render(<CreatePassForm inputData={{ otp: '1234', email: 'test@example.com', password: '', rePassword: '' }} handleOnchange={jest.fn()} />);

    expect(screen.getByText(/Set new password/i)).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
    expect(screen.getByTestId('rePassword-input')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /continue/i })).toBeDisabled();
  });

  it('enables the button when passwords match and are valid', () => {
    const handleOnchange = jest.fn();
    render(<CreatePassForm inputData={{ otp: '1234', email: 'test@example.com', password: 'Password123', rePassword: 'Password123' }} handleOnchange={handleOnchange} />);

    const button = screen.getByRole('button', { name: /continue/i });
    expect(button).toBeEnabled();
  });

  it('displays an error message if the mutation fails', async () => {
    const errorMessage = 'Error changing password';
    (usePasswordChangeMutation as jest.Mock).mockReturnValue([mockPasswordChangeMutation, { loading: false, error: { message: errorMessage } }]);

    render(<CreatePassForm inputData={{ otp: '1234', email: 'test@example.com', password: 'Password123', rePassword: 'Password123' }} handleOnchange={jest.fn()} />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('calls the mutation and redirects on successful password change', async () => {
    mockPasswordChangeMutation.mockResolvedValueOnce({});
    const handleOnchange = jest.fn();

    render(<CreatePassForm inputData={{ otp: '1234', email: 'test@example.com', password: 'Password123', rePassword: 'Password123' }} handleOnchange={handleOnchange} />);

    const button = screen.getByRole('button', { name: /continue/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockPasswordChangeMutation).toHaveBeenCalledWith({
        variables: {
          input: { otp: '1234', email: 'test@example.com', password: 'Password123' },
        },
      });
      expect(mockRouterPush).toHaveBeenCalledWith('/signin');
    });
  });

  it('disables the button when passwords do not match or are invalid', () => {
    render(<CreatePassForm inputData={{ otp: '1234', email: 'test@example.com', password: 'Password123', rePassword: 'DifferentPass' }} handleOnchange={jest.fn()} />);

    const button = screen.getByRole('button', { name: /continue/i });
    expect(button).toBeDisabled();
  });

  it('shows "Setting password..." when loading is true', () => {
    const mockMutation = jest.fn();
    (usePasswordChangeMutation as jest.Mock).mockReturnValue([mockMutation, { loading: true, error: null }]);

    render(<CreatePassForm inputData={{ otp: '1234', email: 'test@example.com', password: 'Password123', rePassword: 'Password123' }} handleOnchange={jest.fn()} />);

    expect(screen.getByText(/Setting password.../i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
