import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { ConfirmEmail } from '@/components/ConfirmEmail';

jest.mock('@/generated', () => ({
  useVerifyOtpMutation: () => [jest.fn(() => Promise.resolve({ data: { verifyOtp: { otpId: '1234' } } })), { loading: false, error: undefined }],
  useRequestSignupMutation: () => [jest.fn(() => Promise.resolve()), { loading: false, error: undefined }],
  OtpType: { Forgot: 'Forgot' },
}));

jest.mock('../src/components/ResetPassword', () => ({
  ResetPassword: jest.fn(({ otpId }) => <div data-testid="reset-password">ResetPassword otpId: {otpId}</div>),
}));

jest.mock('../src/components/OtpForm', () => ({
  OtpForm: jest.fn(({ onSubmit, timeLeft, handleResend, message }) => (
    <div data-testid="otp-form">
      <button onClick={() => onSubmit({ otp: '1234' })}>Submit OTP</button>
      <button onClick={handleResend}>Resend OTP</button>
      <div>{message}</div>
      <div>{timeLeft > 0 ? `Send again in ${timeLeft}s` : 'Send again now'}</div>
    </div>
  )),
}));

describe('ConfirmEmail', () => {
  const mockOnSuccess = jest.fn();
  let consoleErrorSpy: jest.SpyInstance;
  jest.useFakeTimers();

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {
      //intentionally empty
    });
  });
  afterEach(() => {
    consoleErrorSpy.mockRestore();
    jest.clearAllMocks();
  });

  it('renders initial text and components', () => {
    render(<ConfirmEmail onSuccess={mockOnSuccess} email="test@example.com" />);
    expect(screen.getByText('Confirm email'));
    expect(screen.getByText(/To continue, enter the secure code we sent to test@example.com/i));
    expect(screen.getByTestId('otp-form'));
  });

  it('calls verifyOtp on OTP submit and renders ResetPassword on success', async () => {
    render(<ConfirmEmail onSuccess={mockOnSuccess} email="test@example.com" />);

    fireEvent.click(screen.getByText('Submit OTP'));

    await waitFor(() => {
      expect(screen.getByTestId('reset-password'));
      expect(screen.getByText(/ResetPassword otpId: 1234/));
    });
  });

  it('calls requestSignup on resend and shows success message', async () => {
    render(<ConfirmEmail onSuccess={mockOnSuccess} email="test@example.com" />);

    fireEvent.click(screen.getByText('Resend OTP'));

    await waitFor(() => {
      expect(screen.getByText('OTP resent successfully.'));
    });
  });

  it('does not render ResetPassword if otpId is not set', () => {
    render(<ConfirmEmail onSuccess={mockOnSuccess} email="test@example.com" />);
    expect(screen.queryByTestId('reset-password'));
  });

  it('handles missing email gracefully', async () => {
    render(<ConfirmEmail onSuccess={mockOnSuccess} />);

    fireEvent.click(screen.getByText('Submit OTP'));
    fireEvent.click(screen.getByText('Resend OTP'));

    expect(screen.queryByTestId('reset-password'));
  });
  it('logs error if verifyOtp returns no otpId', async () => {
    const mockVerifyOtp = jest.fn().mockResolvedValue({
      data: {
        verifyOtp: {
          //intentionally empty
        },
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    jest.spyOn(require('@/generated'), 'useVerifyOtpMutation').mockReturnValue([mockVerifyOtp, { loading: false, error: null }]);
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    jest.spyOn(require('@/generated'), 'useRequestSignupMutation').mockReturnValue([jest.fn(), { loading: false, error: null }]);

    render(<ConfirmEmail onSuccess={mockOnSuccess} email="test@example.com" />);

    fireEvent.click(screen.getByText('Submit OTP'));

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith('OTP verification failed or otpId missing');
    });
  });

  it('logs error if verifyOtp throws', async () => {
    const mockVerifyOtp = jest.fn().mockRejectedValue(new Error('verifyOtp error'));
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    jest.spyOn(require('@/generated'), 'useVerifyOtpMutation').mockReturnValue([mockVerifyOtp, { loading: false, error: null }]);
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    jest.spyOn(require('@/generated'), 'useRequestSignupMutation').mockReturnValue([jest.fn(), { loading: false, error: null }]);

    render(<ConfirmEmail onSuccess={mockOnSuccess} email="test@example.com" />);

    fireEvent.click(screen.getByText('Submit OTP'));

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith('Verification failed:', expect.any(Error));
    });
  });

  it('logs error if resend OTP fails', async () => {
    const mockRequestSignup = jest.fn().mockRejectedValue(new Error('resendOtp error'));
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    jest.spyOn(require('@/generated'), 'useRequestSignupMutation').mockReturnValue([mockRequestSignup, { loading: false, error: null }]);
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    jest.spyOn(require('@/generated'), 'useVerifyOtpMutation').mockReturnValue([jest.fn(), { loading: false, error: null }]);

    render(<ConfirmEmail onSuccess={mockOnSuccess} email="test@example.com" />);

    fireEvent.click(screen.getByText('Resend OTP'));

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to resend OTP:', expect.any(Error));
    });
  });
  test('stops countdown at zero', () => {
    render(<ConfirmEmail onSuccess={jest.fn()} email="test@example.com" />);

    expect(screen.getByText(/Send again in 60s/));

    act(() => {
      jest.advanceTimersByTime(60000);
    });

    expect(screen.getByText(/Send again now/));

    jest.useRealTimers();
  });
});
