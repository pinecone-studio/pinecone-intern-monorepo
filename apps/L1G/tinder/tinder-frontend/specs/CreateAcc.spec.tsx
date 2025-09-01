/* eslint-disable max-lines */
import React from 'react';
import { CreateAccount } from '@/components/CreateAcc';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

const mockRequestSignup = jest.fn();
const mockVerifyOtp = jest.fn();

jest.mock('@/generated', () => ({
  useRequestSignupMutation: jest.fn(() => [mockRequestSignup, { loading: false, error: null }]),
  useVerifyOtpMutation: jest.fn(() => [mockVerifyOtp, { loading: false, error: null }]),
  OtpType: {
    Create: 'CREATE',
  },
}));

jest.mock('@/components/ConfirmEmail', () => ({
  ConfirmEmail: ({ onSuccess }: any) => {
    return (
      <button data-testid="confirm-email-btn" onClick={onSuccess}>
        Confirm Email
      </button>
    );
  },
}));

describe('CreateAccount Component', () => {
  const mockOnSuccess = jest.fn();
  let userData = { email: '' };
  const mockUpdateUserData = jest.fn((update) => {
    userData = { ...userData, ...update };
  });

  beforeEach(() => {
    jest.clearAllMocks();
    userData = { email: '' };
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { useRequestSignupMutation } = require('@/generated');
    useRequestSignupMutation.mockReturnValue([mockRequestSignup, { loading: false, error: null }]);
  });

  it('submits email and updates step on success', async () => {
    mockRequestSignup.mockResolvedValue({});

    render(<CreateAccount onSuccess={mockOnSuccess} userData={userData} updateUserData={mockUpdateUserData} />);

    const emailInput = screen.getByPlaceholderText('name@example.com');
    const submitBtn = screen.getByRole('button', { name: /Continue/i });

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.click(submitBtn);
    });

    await waitFor(() => {
      expect(mockRequestSignup).toHaveBeenCalledWith({
        variables: { email: 'test@example.com', otpType: 'CREATE' },
      });
      expect(mockUpdateUserData).toHaveBeenCalledWith({ email: 'test@example.com' });
    });
  });

  it('sets error message when signup request fails', async () => {
    mockRequestSignup.mockRejectedValue(new Error('Network Error'));

    render(<CreateAccount onSuccess={mockOnSuccess} userData={userData} updateUserData={mockUpdateUserData} />);

    const emailInput = screen.getByPlaceholderText('name@example.com');
    const submitBtn = screen.getByRole('button', { name: /Continue/i });

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: 'fail@example.com' } });
      fireEvent.click(submitBtn);
    });

    await waitFor(() => {
      expect(screen.getByText('Failed to resend OTP, please try again.')).toBeInTheDocument();
    });
  });

  it('navigates to login page when "Log in" button clicked', () => {
    render(<CreateAccount onSuccess={mockOnSuccess} userData={userData} updateUserData={mockUpdateUserData} />);

    const loginBtn = screen.getByText('Log in');
    fireEvent.click(loginBtn);

    expect(mockPush).toHaveBeenCalledWith('/login');
  });

  it('shows ConfirmEmail component when step is otp and email exists', async () => {
    mockRequestSignup.mockResolvedValue({});

    const { rerender } = render(<CreateAccount onSuccess={mockOnSuccess} userData={userData} updateUserData={mockUpdateUserData} />);

    const emailInput = screen.getByPlaceholderText('name@example.com');
    const submitBtn = screen.getByRole('button', { name: /Continue/i });

    // Submit email form
    await act(async () => {
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.click(submitBtn);
    });

    // Update userData to reflect the state change
    userData.email = 'test@example.com';

    // Re-render with updated userData
    rerender(<CreateAccount onSuccess={mockOnSuccess} userData={userData} updateUserData={mockUpdateUserData} />);

    await waitFor(() => {
      expect(screen.getByTestId('confirm-email-btn')).toBeInTheDocument();
    });
  });

  it('calls onSuccess when ConfirmEmail onSuccess is triggered', async () => {
    mockRequestSignup.mockResolvedValue({});

    const { rerender } = render(<CreateAccount onSuccess={mockOnSuccess} userData={userData} updateUserData={mockUpdateUserData} />);

    const emailInput = screen.getByPlaceholderText('name@example.com');
    const submitBtn = screen.getByRole('button', { name: /Continue/i });

    // First submit the email to trigger step change to 'otp'
    await act(async () => {
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.click(submitBtn);
    });

    // Wait for the API call to complete and updateUserData to be called
    await waitFor(() => {
      expect(mockUpdateUserData).toHaveBeenCalledWith({ email: 'test@example.com' });
    });

    // Update userData manually to reflect the state change
    userData.email = 'test@example.com';

    // Re-render the component with updated userData
    rerender(<CreateAccount onSuccess={mockOnSuccess} userData={userData} updateUserData={mockUpdateUserData} />);
    await waitFor(() => {
      expect(screen.getByTestId('confirm-email-btn')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByTestId('confirm-email-btn'));

    expect(mockOnSuccess).toHaveBeenCalled();
  });

  it('renders email form when userData.email is empty (even if step would be otp)', () => {
    render(<CreateAccount onSuccess={mockOnSuccess} userData={{ email: '' }} updateUserData={mockUpdateUserData} />);

    expect(screen.getByText('Create an account')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('name@example.com')).toBeInTheDocument();
    expect(screen.queryByTestId('confirm-email-btn')).not.toBeInTheDocument();
  });

  it('displays error when mutation hook returns error state', () => {
    const mockError = { message: 'Server error occurred' };
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { useRequestSignupMutation } = require('@/generated');
    useRequestSignupMutation.mockReturnValue([mockRequestSignup, { loading: false, error: mockError }]);

    render(<CreateAccount onSuccess={mockOnSuccess} userData={userData} updateUserData={mockUpdateUserData} />);

    expect(screen.getByText('Server error occurred')).toBeInTheDocument();
  });

  it('shows loading state when mutation is in progress', () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { useRequestSignupMutation } = require('@/generated');
    useRequestSignupMutation.mockReturnValue([mockRequestSignup, { loading: true, error: null }]);

    render(<CreateAccount onSuccess={mockOnSuccess} userData={userData} updateUserData={mockUpdateUserData} />);

    expect(screen.getByText('Wait...')).toBeInTheDocument();
  });

  it('displays success message after successful email submission', async () => {
    mockRequestSignup.mockResolvedValue({});

    render(<CreateAccount onSuccess={mockOnSuccess} userData={userData} updateUserData={mockUpdateUserData} />);

    const emailInput = screen.getByPlaceholderText('name@example.com');
    const submitBtn = screen.getByRole('button', { name: /Continue/i });

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.click(submitBtn);
    });

    await waitFor(() => {
      expect(screen.getByText('OTP resent successfully.')).toBeInTheDocument();
    });
  });

  it('validates email format and shows error for invalid email', async () => {
    render(<CreateAccount onSuccess={mockOnSuccess} userData={userData} updateUserData={mockUpdateUserData} />);

    const emailInput = screen.getByPlaceholderText('name@example.com');
    const submitBtn = screen.getByRole('button', { name: /Continue/i });

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
      fireEvent.click(submitBtn);
    });

    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email')).toBeInTheDocument();
    });

    expect(mockRequestSignup).not.toHaveBeenCalled();
  });
});
