import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { useVerifyOtpMutation } from '@/generated';
import { StepTwo } from '@/app/signup/_components/StepTwo';
import '@testing-library/jest-dom';

jest.mock('@/generated', () => ({
  useRequestOtpMutation: jest.fn(() => [jest.fn()]),
  useVerifyOtpMutation: jest.fn(),
}));

jest.mock('@/components/ui/input-otp', () => ({
  InputOTP: ({ onChange, maxLength }: any) => <input data-testid="otp-input" onChange={(e) => onChange(e.target.value)} maxLength={maxLength} />,
  InputOTPGroup: ({ children }: any) => <div>{children}</div>,
  InputOTPSlot: () => <div />,
}));

describe('StepTwo OTP Verification', () => {
  const mockSetStep = jest.fn();
  const mockVerifyOtp = jest.fn();

  beforeEach(() => {
    (useVerifyOtpMutation as jest.Mock).mockReturnValue([mockVerifyOtp, { loading: false }]);
    Storage.prototype.getItem = jest.fn(() => 'test@example.com');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('verifies OTP when 6 digits are entered', async () => {
    mockVerifyOtp.mockResolvedValue({ data: { verifyOTP: true } });
    render(<StepTwo setStep={mockSetStep} />);
    fireEvent.change(screen.getByTestId('otp-input'), { target: { value: '123456' } });
    expect(mockVerifyOtp).toHaveBeenCalledWith({
      variables: { email: 'test@example.com', otp: '123456' },
    });
  });

  it('advances to next step when OTP is valid', async () => {
    mockVerifyOtp.mockResolvedValue({ data: { verifyOTP: true } });
    render(<StepTwo setStep={mockSetStep} />);
    fireEvent.change(screen.getByTestId('otp-input'), { target: { value: '123456' } });
    await act(() => Promise.resolve());
    expect(mockSetStep).toHaveBeenCalledWith(3);
  });

  it('shows error when OTP is invalid', async () => {
    mockVerifyOtp.mockResolvedValue({ data: { verifyOTP: false } });
    render(<StepTwo setStep={mockSetStep} />);
    fireEvent.change(screen.getByTestId('otp-input'), { target: { value: '123456' } });
    expect(await screen.findByText('Invalid OTP. Please try again.')).toBeInTheDocument();
  });

  it('shows error when OTP verification fails', async () => {
    mockVerifyOtp.mockRejectedValue(new Error('fail'));
    render(<StepTwo setStep={mockSetStep} />);
    fireEvent.change(screen.getByTestId('otp-input'), { target: { value: '123456' } });
    expect(await screen.findByText('Error verifying OTP. Please try again.')).toBeInTheDocument();
  });

  it('shows loading state during OTP verification', async () => {
    const verifyPromise = new Promise((resolve) => setTimeout(() => resolve({ data: { verifyOTP: true } }), 100));
    (useVerifyOtpMutation as jest.Mock).mockReturnValue([() => verifyPromise, { loading: true }]);

    render(<StepTwo setStep={mockSetStep} />);
    fireEvent.change(screen.getByTestId('otp-input'), { target: { value: '123456' } });

    expect(await screen.findByText('Verifying OTP...')).toBeInTheDocument();
  });
});
