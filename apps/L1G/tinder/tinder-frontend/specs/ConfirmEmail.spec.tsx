/* eslint-disable no-console, max-lines */
import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ConfirmEmail } from '@/components/ConfirmEmail';

const mockVerifyOtp = jest.fn();
const mockRequestSignup = jest.fn();

jest.mock('@/generated', () => ({
  useVerifyOtpMutation: () => [mockVerifyOtp, { loading: false, error: undefined }],
  useRequestSignupMutation: () => [mockRequestSignup, { loading: false, error: undefined }],
  OtpType: { Forgot: 'FORGOT' },
}));

jest.mock('@/components/ResetPassword', () => ({
  ResetPassword: ({ onSuccess }: any) => (
    <div data-testid="reset-password-mock">
      ResetPassword Mock
      <button onClick={onSuccess}>Trigger Success</button>
    </div>
  ),
}));

jest.mock('@/components/OtpForm', () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const React = require('react');
  /* eslint-disable complexity */
  const OTPFeedback = ({ message, resendError, verifyError, verifying, resending }: any) => {
    const messages = [
      message && <div key="message">{message}</div>,
      resendError && <div key="resendError">{resendError.message}</div>,
      verifyError && <div key="verifyError">{verifyError.message}</div>,
      verifying && <div key="verifying">Verifying...</div>,
      resending && <div key="resending">Resending...</div>,
    ].filter(Boolean);

    return <>{messages}</>;
  };
  /* eslint-enable complexity */

  return {
    OTPForm: ({ onSubmit, handleResend, timeLeft, resending, resendError, verifyError, message, verifying }: any) => {
      const [otp, setOtp] = React.useState('');
      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ otp });
      };

      return (
        <form onSubmit={handleSubmit}>
          <input role="textbox" value={otp} onChange={(e) => setOtp(e.target.value)} data-testid="otp-input" />
          <button type="submit">Confirm</button>
          <button type="button" onClick={handleResend}>
            Resend Code
          </button>
          <div>{`Send again in ${timeLeft}s`}</div>
          <OTPFeedback {...{ message, resendError, verifyError, verifying, resending }} />
        </form>
      );
    },
  };
});

const mockOnSuccess = jest.fn();

beforeEach(() => {
  jest.useFakeTimers();
  jest.clearAllMocks();
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

describe('ConfirmEmail', () => {
  it('renders correctly with initial text', () => {
    render(<ConfirmEmail onSuccess={mockOnSuccess} email="test@example.com" />);
    expect(screen.getByText('Confirm email'));
    expect(screen.getByText(/To continue, enter the secure code we sent/i));
    expect(screen.getByText(/Send again in 60s/i));
    expect(screen.getByRole('button', { name: /Confirm/i }));
  });

  it('handles OTP input change', () => {
    render(<ConfirmEmail onSuccess={mockOnSuccess} email="test@example.com" />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '1234' } });
    expect(input).toHaveValue('1234');
  });

  it('calls verifyOtp mutation and shows ResetPassword on valid submit', async () => {
    mockVerifyOtp.mockResolvedValueOnce({ data: { verifyOtp: { otpId: 'otp123' } } });

    render(<ConfirmEmail onSuccess={mockOnSuccess} email="test@example.com" />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '1234' } });
    fireEvent.click(screen.getByRole('button', { name: /Confirm/i }));

    await waitFor(() => {
      expect(mockVerifyOtp).toHaveBeenCalledWith({
        variables: { email: 'test@example.com', otp: '1234', otpType: 'FORGOT' },
      });
    });

    expect(await screen.findByTestId('reset-password-mock'));
  });

  it('handles resend button click and resets timer', async () => {
    mockRequestSignup.mockResolvedValueOnce({
      data: {
        //intentionally empty
      },
    });

    render(<ConfirmEmail onSuccess={mockOnSuccess} email="test@example.com" />);
    act(() => {
      jest.advanceTimersByTime(60000);
    });

    fireEvent.click(screen.getByRole('button', { name: /Resend Code/i }));

    await waitFor(() => {
      expect(mockRequestSignup).toHaveBeenCalledWith({
        variables: { email: 'test@example.com', otpType: 'FORGOT' },
      });
    });

    await waitFor(() => {
      expect(screen.getByText(/Send again in 60s/i));
    });
  });

  it('counts down timer correctly', () => {
    render(<ConfirmEmail onSuccess={mockOnSuccess} email="test@example.com" />);
    act(() => {
      jest.advanceTimersByTime(10000);
    });
    expect(screen.getByText(/Send again in 50s/i));

    act(() => {
      jest.advanceTimersByTime(50000);
    });
    expect(screen.getByText(/Send again in 0s/i));
  });

  it('logs error if otpId is missing in verifyOtp response', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {
      //intentionally empty
    });
    mockVerifyOtp.mockResolvedValueOnce({ data: { verifyOtp: null } });

    render(<ConfirmEmail onSuccess={mockOnSuccess} email="test@example.com" />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '1234' } });
    fireEvent.click(screen.getByRole('button', { name: /Confirm/i }));

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('OTP verification failed or otpId missing');
    });

    consoleSpy.mockRestore();
  });

  it('logs error when verifyOtp throws exception', async () => {
    const error = new Error('Verification error');
    mockVerifyOtp.mockRejectedValueOnce(error);
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {
      //intentionally empty
    });

    render(<ConfirmEmail onSuccess={mockOnSuccess} email="test@example.com" />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '1234' } });
    fireEvent.click(screen.getByRole('button', { name: /Confirm/i }));

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Verification failed:', error);
    });

    consoleSpy.mockRestore();
  });

  it('logs error on resend OTP failure', async () => {
    const error = new Error('Resend OTP failed');
    mockRequestSignup.mockRejectedValueOnce(error);
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {
      //intentionally empty
    });

    render(<ConfirmEmail onSuccess={mockOnSuccess} email="test@example.com" />);
    fireEvent.click(screen.getByRole('button', { name: /Resend Code/i }));

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Failed to resend OTP:', error);
      expect(screen.getByText('Failed to resend OTP, please try again.'));
    });

    consoleSpy.mockRestore();
  });

  it('does nothing if email is missing when verifying OTP', async () => {
    render(<ConfirmEmail onSuccess={mockOnSuccess} email={undefined} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '1234' } });
    fireEvent.click(screen.getByRole('button', { name: /Confirm/i }));

    await waitFor(() => {
      expect(mockVerifyOtp).not.toHaveBeenCalled();
    });
  });

  it('does nothing if email is missing when resending OTP', async () => {
    render(<ConfirmEmail onSuccess={mockOnSuccess} email={undefined} />);
    fireEvent.click(screen.getByRole('button', { name: /Resend Code/i }));

    await waitFor(() => {
      expect(mockRequestSignup).not.toHaveBeenCalled();
    });
  });
  it('does nothing if email is missing when resending OTP', async () => {
    render(<ConfirmEmail onSuccess={mockOnSuccess} email={undefined} />);
    const resendBtn = screen.getByRole('button', { name: /Resend Code/i });
    fireEvent.click(resendBtn);
    await waitFor(() => {
      expect(mockRequestSignup).not.toHaveBeenCalled();
    });
  });
  it('calls onSuccess when ResetPassword triggers success', async () => {
    mockVerifyOtp.mockResolvedValueOnce({ data: { verifyOtp: { otpId: 'otp123' } } });
    render(<ConfirmEmail onSuccess={mockOnSuccess} email="test@example.com" />);
    const input = screen.getByRole('textbox');
    const confirmBtn = screen.getByRole('button', { name: /Confirm/i });
    fireEvent.change(input, { target: { value: '1234' } });
    fireEvent.click(confirmBtn);
    await waitFor(() => {
      expect(screen.getByTestId('reset-password-mock'));
    });
    fireEvent.click(screen.getByText('Trigger Success'));
    expect(mockOnSuccess).toHaveBeenCalled();
  });
  it('resets timer immediately on resend button click', async () => {
    mockRequestSignup.mockResolvedValueOnce({
      data: {
        //intentionally empty
      },
    });
    render(<ConfirmEmail onSuccess={mockOnSuccess} email="test@example.com" />);
    const resendBtn = screen.getByRole('button', { name: /Resend Code/i });
    fireEvent.click(resendBtn);
    expect(screen.getByText(/Send again in 60s/i));
  });
});
