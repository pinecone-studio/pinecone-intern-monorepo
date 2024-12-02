import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { OtpForm } from '@/components/main';
import { usePasswordChangeMutation, usePasswordRecoveryRequestMutation } from '@/generated';

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

jest.mock('@/generated', () => ({
  usePasswordChangeMutation: jest.fn(),
  usePasswordRecoveryRequestMutation: jest.fn(),
}));

describe('OtpForm Component', () => {
  const mockPasswordChange = jest.fn();
  const mockPasswordRecoveryRequest = jest.fn();
  const setInputData = jest.fn();
  const setCurrentIndex = jest.fn();

  const mockProps = {
    setInputData,
    setCurrentIndex,
    inputData: { email: 'test@example.com', otp: '' },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (usePasswordChangeMutation as jest.Mock).mockReturnValue([
      mockPasswordChange,
      { loading: false, error: null },
    ]);
    (usePasswordRecoveryRequestMutation as jest.Mock).mockReturnValue([
      mockPasswordRecoveryRequest,
    ]);
    jest.useFakeTimers();
  });

  it('renders the OTP inputs and buttons', () => {
    render(<OtpForm {...mockProps} />);
  
    expect(screen.getByLabelText('OTP input 1')).toBeInTheDocument();
    expect(screen.getByLabelText('OTP input 2')).toBeInTheDocument();
    expect(screen.getByLabelText('OTP input 3')).toBeInTheDocument();
    expect(screen.getByLabelText('OTP input 4')).toBeInTheDocument();
    expect(screen.getByText('Continue')).toBeInTheDocument();
  
    // Use getByTestId for more robust selection
    expect(screen.getByTestId('resend-button')).toBeInTheDocument();
  
    // Alternatively, use a more flexible matcher for dynamic text
    expect(screen.getByText(/Send again/)).toBeInTheDocument();
  });

  it('updates OTP input value', () => {
    render(<OtpForm {...mockProps} />);
  
    // Get the actual input element inside the OTP input container
    const otpInput1 = screen.getByTestId('otp-input-1').querySelector('input');
    
    // If the OTP input is nested inside a div and isn't directly an input, use querySelector to find the native input
    fireEvent.change(otpInput1, { target: { value: '5' } });
  
    // Check that setInputData is called with the expected value
    expect(setInputData).toHaveBeenCalledWith(expect.any(Function));
  });
  

  it('calls passwordChange mutation when Continue is clicked', async () => {
    render(<OtpForm {...mockProps} />);

    const continueButton = screen.getByText('Continue');
    fireEvent.click(continueButton);

    await waitFor(() =>
      expect(mockPasswordChange).toHaveBeenCalledWith({
        variables: {
          input: { otp: mockProps.inputData.otp, email: mockProps.inputData.email, password: '' },
        },
      })
    );

    expect(setCurrentIndex).toHaveBeenCalledWith(2);
  });

  it('disables the Continue button when loading', () => {
    (usePasswordChangeMutation as jest.Mock).mockReturnValue([
      mockPasswordChange,
      { loading: true, error: null },
    ]);

    render(<OtpForm {...mockProps} />);

    const continueButton = screen.getByText('Verifying...');
    expect(continueButton).toBeDisabled();
  });

  it('disables the Resend OTP button while timer is running', async () => {
    render(<OtpForm {...mockProps} />);

    const resendButton = screen.getByText('Send again');
    expect(resendButton).toBeInTheDocument();
    expect(resendButton).toBeDisabled();

    // Simulate the passage of time
    act(() => {
      jest.advanceTimersByTime(1000);  // Fast forward 1 second
    });

    // Check that the timer is still showing the countdown
    await waitFor(() =>
      expect(screen.getByText('Send again (59s)')).toBeInTheDocument()
    );
  });

  it('calls passwordRecoveryRequest mutation when Resend OTP is clicked', async () => {
    render(<OtpForm {...mockProps} />);

    const resendButton = screen.getByText('Send again');
    fireEvent.click(resendButton);

    await waitFor(() =>
      expect(mockPasswordRecoveryRequest).toHaveBeenCalledWith({
        variables: { input: { email: mockProps.inputData.email } },
      })
    );
  });

  it('displays an error message if an error occurs', async () => {
    (usePasswordChangeMutation as jest.Mock).mockReturnValue([
      mockPasswordChange,
      { loading: false, error: { message: 'Invalid OTP' } },
    ]);

    render(<OtpForm {...mockProps} />);

    expect(screen.getByText('Invalid OTP')).toBeInTheDocument();
  });
});
