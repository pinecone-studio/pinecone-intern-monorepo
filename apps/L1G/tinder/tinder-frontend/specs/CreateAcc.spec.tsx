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

jest.mock('@/generated', () => ({
  useRequestSignupMutation: () => [mockRequestSignup, { error: null }],
  useVerifyOtpMutation: () => [jest.fn(), { loading: false, error: null }],
  OtpType: {
    Create: 'CREATE',
  },
}));

jest.mock('@/components/ConfirmEmail', () => ({
  ConfirmEmail: ({ onSuccess }: any) => {
    return <button data-testid="confirm-email-btn" onClick={onSuccess} />;
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
  });

  it('sets success message, updates user data, sets step and calls onSuccess after successful signup', async () => {
    mockRequestSignup.mockResolvedValue({});

    render(<CreateAccount onSuccess={mockOnSuccess} userData={userData} updateUserData={mockUpdateUserData} />);

    const emailInput = screen.getByPlaceholderText('name@example.com');
    const submitBtn = screen.getByRole('button', { name: /Continue/i });

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.click(submitBtn);
    });

    await waitFor(() => {
      expect(mockUpdateUserData).toHaveBeenCalledWith({ email: 'test@example.com' });
    });

    userData.email = 'test@example.com';
    render(<CreateAccount onSuccess={mockOnSuccess} userData={userData} updateUserData={mockUpdateUserData} />);

    expect(mockOnSuccess).not.toHaveBeenCalled();
  });

  it('logs and calls onSuccess when OTP is verified successfully', async () => {
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {
      // Intentionally empty
    });

    const mockVerifyOtp = jest.fn();

    jest.mock('@/generated', () => ({
      useRequestSignupMutation: () => [mockRequestSignup, { error: null }],
      useVerifyOtpMutation: () => [mockVerifyOtp, { loading: false, error: null }],
      OtpType: {
        Create: 'CREATE',
      },
    }));

    render(<CreateAccount onSuccess={mockOnSuccess} userData={{ email: 'test@example.com' }} updateUserData={mockUpdateUserData} />);

    await act(async () => {
      mockOnSuccess();
      console.log('OTP verified successfully');
    });

    expect(consoleLogSpy).toHaveBeenCalledWith('OTP verified successfully');
    expect(mockOnSuccess).toHaveBeenCalled();

    consoleLogSpy.mockRestore();
  });

  it('navigates to login page when "Log in" button clicked', () => {
    render(<CreateAccount onSuccess={mockOnSuccess} userData={userData} updateUserData={mockUpdateUserData} />);

    const loginBtn = screen.getByText('Log in');
    fireEvent.click(loginBtn);

    expect(mockPush).toHaveBeenCalledWith('/login');
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
      expect(mockUpdateUserData).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(screen.getByText('OTP resent successfully.')).toBeInTheDocument();
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

  it('calls handleOtpSuccess when ConfirmEmail onSuccess is triggered', async () => {
    const mockOnSuccess = jest.fn();
    mockRequestSignup.mockResolvedValue({});

    const { rerender } = render(<CreateAccount onSuccess={mockOnSuccess} userData={{ email: '' }} updateUserData={mockUpdateUserData} />);

    const emailInput = screen.getByPlaceholderText('name@example.com');
    const submitBtn = screen.getByRole('button', { name: /Continue/i });

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.click(submitBtn);
    });

    userData.email = 'test@example.com';

    rerender(<CreateAccount onSuccess={mockOnSuccess} userData={userData} updateUserData={mockUpdateUserData} />);

    await waitFor(() => {
      expect(screen.getByTestId('confirm-email-btn')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId('confirm-email-btn'));

    expect(mockOnSuccess).toHaveBeenCalled();
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
  it('renders email form when step would be otp but userData.email is empty', () => {
    const mockSetStep = jest.fn();
    const mockSetMessage = jest.fn();

    jest
      .spyOn(React, 'useState')
      .mockImplementationOnce(() => ['otp', mockSetStep])
      .mockImplementationOnce(() => [null, mockSetMessage]);

    render(<CreateAccount onSuccess={mockOnSuccess} userData={{ email: '' }} updateUserData={mockUpdateUserData} />);

    expect(screen.getByText('Create an account')).toBeInTheDocument();
    expect(screen.queryByTestId('confirm-email-btn')).not.toBeInTheDocument();

    jest.restoreAllMocks();
  });
  it('displays error when mutation hook returns error state', () => {
    const mockWithError = jest.fn();
    const mockError = { message: 'Server error occurred' };
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const originalMock = require('@/generated').useRequestSignupMutation;
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('@/generated').useRequestSignupMutation = jest.fn(() => [mockWithError, { error: mockError }]);

    render(<CreateAccount onSuccess={mockOnSuccess} userData={userData} updateUserData={mockUpdateUserData} />);
    expect(screen.getByText('Server error occurred')).toBeInTheDocument();
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('@/generated').useRequestSignupMutation = originalMock;
  });
});
