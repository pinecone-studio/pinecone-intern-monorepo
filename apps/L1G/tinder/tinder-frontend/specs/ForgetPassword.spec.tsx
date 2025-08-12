import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ForgetPassword } from '@/components/ForgetPassword';

jest.mock('@/generated', () => ({
  useRequestSignupMutation: () => [
    jest.fn().mockResolvedValue({
      data: {
        requestSignup: {
          output: 'OTP sent successfully',
        },
      },
    }),
    { loading: false, error: undefined, data: undefined },
  ],

  useVerifyOtpMutation: () => [jest.fn(), { loading: false, error: undefined }],

  OtpType: { Forgot: 'FORGOT' },
}));
jest.mock('@/components/ConfirmEmail', () => ({
  ConfirmEmail: ({ onSuccess }: { onSuccess: () => void }) => (
    <div data-testid="confirm-email-mock">
      ConfirmEmail Mock
      <button onClick={onSuccess}>Trigger OTP Success</button>
    </div>
  ),
}));
describe('ForgetPassword Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the logo, text, input and button', () => {
    render(<ForgetPassword />);

    expect(screen.getByText('Forget password'));
    expect(screen.getByText('Enter your email account to reset password'));
    expect(screen.getByLabelText(/Email/i));
    expect(screen.getByRole('button', { name: /Continue/i }));
  });

  it('shows validation error for invalid email', async () => {
    render(<ForgetPassword />);

    const emailInput = screen.getByLabelText(/Email/i);
    const submitButton = screen.getByRole('button', { name: /Continue/i });

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.blur(emailInput);
    fireEvent.click(submitButton);

    expect(await screen.findByText('Please enter a valid email'));
  });

  it('accepts valid input and submits the form', async () => {
    render(<ForgetPassword />);

    const emailInput = screen.getByLabelText(/Email/i);
    const submitButton = screen.getByRole('button', { name: /Continue/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.queryByText('ResetPassword Mock'));
    });
  });
  it('transitions to password step after successful OTP verification', async () => {
    render(<ForgetPassword />);

    const emailInput = screen.getByLabelText(/Email/i);
    const submitButton = screen.getByRole('button', { name: /Continue/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByTestId('confirm-email-mock'));
    });

    fireEvent.click(screen.getByText('Trigger OTP Success'));
  });
});
