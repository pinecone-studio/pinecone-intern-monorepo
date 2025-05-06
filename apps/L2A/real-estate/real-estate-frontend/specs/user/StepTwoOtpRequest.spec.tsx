import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { useRequestOtpMutation, useVerifyOtpMutation } from '@/generated';
import { StepTwo } from '@/app/signup/_components/StepTwo';
import '@testing-library/jest-dom'; 

jest.mock('@/generated', () => ({
  useRequestOtpMutation: jest.fn(),
  useVerifyOtpMutation: jest.fn(),
}));

jest.mock('@/components/ui/input-otp', () => ({
  InputOTP: ({ onChange, maxLength }: any) => (
    <input data-testid="otp-input" onChange={(e) => onChange(e.target.value)} maxLength={maxLength} />
  ),
  InputOTPGroup: ({ children }: any) => <div>{children}</div>,
  InputOTPSlot: () => <div />,
}));

describe('StepTwo OTP Request', () => {
  const mockSetStep = jest.fn();
  const mockRequestOtp = jest.fn();

  beforeEach(() => {
    (useRequestOtpMutation as jest.Mock).mockReturnValue([mockRequestOtp]);
    (useVerifyOtpMutation as jest.Mock).mockReturnValue([jest.fn(), { loading: false }]);
    Storage.prototype.getItem = jest.fn((key) => (key === 'email' ? 'test@example.com' : null));
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it('renders without crashing', () => {
    render(<StepTwo setStep={mockSetStep} />);
    expect(screen.getByTestId('otp-input')).toBeInTheDocument();
  });

  it('requests OTP on mount if email exists', async () => {
    mockRequestOtp.mockResolvedValueOnce({});
    render(<StepTwo setStep={mockSetStep} />);
    expect(mockRequestOtp).toHaveBeenCalledWith({ variables: { email: 'test@example.com' } });
  });

  it('shows error when OTP request fails', async () => {
    mockRequestOtp.mockRejectedValueOnce(new Error('Request failed'));
    render(<StepTwo setStep={jest.fn()} />);
    await waitFor(() => {
      expect(screen.getByText('Error sending OTP. Please try again.')).toBeInTheDocument();
    });
  });

  it('shows error when email is missing during OTP request', async () => {
    Storage.prototype.getItem = jest.fn(() => '');
    render(<StepTwo setStep={mockSetStep} />);
    act(() => { jest.advanceTimersByTime(15000); });
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /Send again\(0\)/ }));
    });
    expect(await screen.findByText('Email not found. Please restart the signup process.')).toBeInTheDocument();
  });

  it('starts countdown timer after OTP request', async () => {
    mockRequestOtp.mockResolvedValueOnce({});
    render(<StepTwo setStep={mockSetStep} />);
    expect(screen.getByText(/Send again\(15\)/)).toBeInTheDocument();
    act(() => { jest.advanceTimersByTime(1000); });
    expect(screen.getByText(/Send again\(14\)/)).toBeInTheDocument();
  });

  it('enables resend button when timer reaches 0', async () => {
    mockRequestOtp.mockResolvedValueOnce({});
    render(<StepTwo setStep={mockSetStep} />);
    act(() => { jest.advanceTimersByTime(15000); });
    expect(screen.getByRole('button', { name: /Send again\(0\)/ })).toBeInTheDocument();
  });

  it('allows resending OTP when button is clicked', async () => {
    mockRequestOtp.mockResolvedValue({});
    render(<StepTwo setStep={mockSetStep} />);
    act(() => { jest.advanceTimersByTime(15000); });
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /Send again\(0\)/ }));
    });
    expect(mockRequestOtp).toHaveBeenCalledTimes(2);
    const matching = screen.getAllByText((_, el) => el?.textContent?.replace(/\s/g, '') === 'Sendagain(15)');
    expect(matching.length).toBeGreaterThan(0);
  });
});