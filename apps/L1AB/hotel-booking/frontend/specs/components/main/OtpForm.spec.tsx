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
    inputData: { email: 'test@example.com', otp: '', password: '', rePassword: '' },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (usePasswordChangeMutation as jest.Mock).mockReturnValue([mockPasswordChange, { loading: false, error: null }]);
    (usePasswordRecoveryRequestMutation as jest.Mock).mockReturnValue([mockPasswordRecoveryRequest]);
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders the OTP inputs and buttons', () => {
    render(<OtpForm {...mockProps} />);

    expect(screen.getByLabelText('OTP input 1')).toBeInTheDocument();
    expect(screen.getByLabelText('OTP input 2')).toBeInTheDocument();
    expect(screen.getByLabelText('OTP input 3')).toBeInTheDocument();
    expect(screen.getByLabelText('OTP input 4')).toBeInTheDocument();
    expect(screen.getByText('Continue')).toBeInTheDocument();
    expect(screen.getByTestId('resend-button')).toBeInTheDocument();
    expect(screen.getByText(/Send again/)).toBeInTheDocument();
  });
  it('updates OTP input value', () => {
    const mockSetInputData = jest.fn();
    const mockProps = {
      setInputData: mockSetInputData,
      setCurrentIndex: jest.fn(),
      inputData: {
        otp: '',
        email: 'test@example.com',
      },
    };
  
    render(<OtpForm {...mockProps} />);
  
    const otpInput = screen.getByTestId('otp-input-group');
  
    fireEvent.change(otpInput, { target: { value: '1234' } });
  
    const expectedState = { otp: '1234', email: 'test@example.com' };
  
    expect(mockSetInputData).toHaveBeenCalled();
    const updateFn = mockSetInputData.mock.calls[0][0];
    const newState = typeof updateFn === 'function' ? updateFn(mockProps.inputData) : updateFn;
  
    expect(newState).toEqual(expectedState);
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
  });

  it('disables the Continue button when loading', () => {
    (usePasswordChangeMutation as jest.Mock).mockReturnValue([mockPasswordChange, { loading: true, error: null }]);

    render(<OtpForm {...mockProps} />);

    const continueButton = screen.getByText('Verifying...');
    expect(continueButton).toBeDisabled();
  });

  it('calls passwordRecoveryRequest mutation when Resend OTP is clicked', async () => {
    const mockPasswordRecoveryRequest = jest.fn();
    (usePasswordRecoveryRequestMutation as jest.Mock).mockReturnValue([mockPasswordRecoveryRequest]);

    const mockProps = {
      setInputData: jest.fn(),
      setCurrentIndex: jest.fn(),
      inputData: { otp: '', email: 'test@example.com', password: '', rePassword: '' },
    };

    render(<OtpForm {...mockProps} />);

    const resendButton = screen.getByTestId('resend-button');
    expect(resendButton).toBeDisabled();

    act(() => {
      jest.advanceTimersByTime(60000);
    });

    expect(resendButton).not.toBeDisabled();

    fireEvent.click(resendButton);

    await waitFor(() =>
      expect(mockPasswordRecoveryRequest).toHaveBeenCalledWith({
        variables: { input: { email: mockProps.inputData.email } },
      })
    );
  });

  it('displays an error message if an error occurs', async () => {
    (usePasswordChangeMutation as jest.Mock).mockReturnValue([mockPasswordChange, { loading: false, error: { message: 'Invalid OTP' } }]);

    render(<OtpForm {...mockProps} />);

    expect(screen.getByText('Invalid OTP')).toBeInTheDocument();
  });
});
