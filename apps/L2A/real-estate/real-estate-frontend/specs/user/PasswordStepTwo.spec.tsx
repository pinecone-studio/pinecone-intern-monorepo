import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import { PasswordStepTwo } from '@/app/forget-password/_components/PasswordStepTwo';
import '@testing-library/jest-dom';

jest.useFakeTimers();

const mockVerifyOtp = jest.fn();
const mockRequestOtp = jest.fn();

beforeAll(() => {
  global.ResizeObserver = class {
    observe(): void {
      // noop
    }
    unobserve(): void {
      // noop
    }
    disconnect(): void {
      // noop
    }
  };
});

jest.mock('@/generated', () => ({
  useVerifyOtpMutation: () => [mockVerifyOtp, { loading: false }],
  useRequestOtpMutation: () => [mockRequestOtp],
}));

describe('PasswordStepTwo', () => {
  const mockSetStep = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders OTP input slots', () => {
    render(<PasswordStepTwo setStep={mockSetStep} email="test@example.com" />);
    const otpInput = document.querySelector('[data-cy="otp-input"]');
    expect(otpInput).toBeInTheDocument();
  });

  it('sends OTP on mount if email is provided', async () => {
    await act(async () => {
      render(<PasswordStepTwo setStep={mockSetStep} email="test@example.com" />);
    });
    await waitFor(() => {
      expect(mockRequestOtp).toHaveBeenCalled();
    });
  });

  it('shows error if email is missing when sending OTP', async () => {
    await act(async () => {
      render(<PasswordStepTwo setStep={mockSetStep} email="" />);
    });

    act(() => {
      jest.advanceTimersByTime(15000);
    });

    await waitFor(() => {
      const resendBtn = screen.getByRole('button', { name: /Send again/i });
      expect(resendBtn).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /Send again/i }));

    await waitFor(() => {
      const error = screen.getByTestId('otp-error');
      expect(error).toBeInTheDocument();
      expect(error).toHaveTextContent(/Email not found/i);
    });
  });

  it('shows error if OTP request fails', async () => {
    mockRequestOtp.mockRejectedValueOnce(new Error('fail'));
    await act(async () => {
      render(<PasswordStepTwo setStep={mockSetStep} email="test@example.com" />);
    });

    act(() => {
      jest.advanceTimersByTime(15000);
    });

    await waitFor(() => {
      const resendBtn = screen.getByRole('button', { name: /Send again/i });
      expect(resendBtn).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /Send again/i }));

    await waitFor(() => {
      const error = screen.getByTestId('otp-error');
      expect(error).toBeInTheDocument();
      expect(error).toHaveTextContent(/Error sending OTP/i);
    });
  });

  it('disables resend until timer ends', async () => {
    await act(async () => {
      render(<PasswordStepTwo setStep={mockSetStep} email="test@example.com" />);
    });
    expect(screen.getByText(/Send again \(15\)/)).toBeInTheDocument();
    act(() => {
      jest.advanceTimersByTime(15000);
    });
    await waitFor(() => {
      const resendText = screen.queryByRole('button', { name: /Send again/i });
      expect(resendText).toBeTruthy();
    });
  });

  it('verifies OTP when 6 digits entered and succeeds', async () => {
    mockVerifyOtp.mockResolvedValueOnce({ data: { verifyOTP: true } });
    await act(async () => {
      render(<PasswordStepTwo setStep={mockSetStep} email="test@example.com" />);
    });
    const otpInput = document.querySelector('[data-cy="otp-input"]') as HTMLInputElement;
    fireEvent.change(otpInput, { target: { value: '123456' } });

    await waitFor(() => {
      expect(mockVerifyOtp).toHaveBeenCalledWith({ variables: { email: 'test@example.com', otp: '123456' } });
      expect(mockSetStep).toHaveBeenCalledWith(3);
    });
  });

  it('verifies OTP and fails', async () => {
    mockVerifyOtp.mockResolvedValueOnce({ data: { verifyOTP: false } });
    await act(async () => {
      render(<PasswordStepTwo setStep={mockSetStep} email="test@example.com" />);
    });
    const otpInput = document.querySelector('[data-cy="otp-input"]') as HTMLInputElement;
    fireEvent.change(otpInput, { target: { value: '111111' } });

    await waitFor(() => {
      const error = screen.getByTestId('otp-error');
      expect(error).toBeInTheDocument();
      expect(error).toHaveTextContent(/Invalid OTP/i);
    });
  });

  it('verifies OTP and throws error', async () => {
    mockVerifyOtp.mockRejectedValueOnce(new Error('fail'));
    await act(async () => {
      render(<PasswordStepTwo setStep={mockSetStep} email="test@example.com" />);
    });
    const otpInput = document.querySelector('[data-cy="otp-input"]') as HTMLInputElement;
    fireEvent.change(otpInput, { target: { value: '999999' } });

    await waitFor(() => {
      const error = screen.getByTestId('otp-error');
      expect(error).toBeInTheDocument();
      expect(error).toHaveTextContent(/Error verifying OTP/i);
    });
  });

  it('shows loading message when testLoading prop is true', () => {
    render(<PasswordStepTwo setStep={mockSetStep} email="test@example.com" testLoading={true} />);
    expect(screen.getByTestId('otp-loading')).toBeInTheDocument();
  });
});
