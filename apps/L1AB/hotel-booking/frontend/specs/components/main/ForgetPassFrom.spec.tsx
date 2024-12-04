import { render, screen, fireEvent } from '@testing-library/react';
import { usePasswordRecoveryRequestMutation } from '@/generated';
import { ForgetPassForm } from '@/components/main';
import '@testing-library/jest-dom';

jest.mock('@/generated', () => ({
  usePasswordRecoveryRequestMutation: jest.fn(),
}));

describe('ForgetPassForm Component', () => {
  const mockPasswordRecoveryRequest = jest.fn();
  const setInputData = jest.fn();
  const setCurrentIndex = jest.fn();

  const mockProps = {
    setInputData,
    setCurrentIndex,
    inputData: { email: '', otp: '', password: '', rePassword: '' },
    handleOnchange: jest.fn(),
  };

  beforeEach(() => {
    (usePasswordRecoveryRequestMutation as jest.Mock).mockReturnValue([mockPasswordRecoveryRequest, { loading: false, error: null }]);
  });

  it('renders the email input and OTP button', () => {
    render(<ForgetPassForm {...mockProps} />);

    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('send-otp-button')).toBeInTheDocument();
  });

  it('calls handleOnchange when typing in the email input', () => {
    render(<ForgetPassForm {...mockProps} />);

    const emailInput = screen.getByTestId('email-input');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    expect(mockProps.handleOnchange).toHaveBeenCalled();
  });

  it('disables the button when loading is true', () => {
    (usePasswordRecoveryRequestMutation as jest.Mock).mockReturnValue([mockPasswordRecoveryRequest, { loading: true, error: null }]);

    render(<ForgetPassForm {...mockProps} />);

    const otpButton = screen.getByTestId('send-otp-button');
    expect(otpButton).toBeDisabled();
    expect(otpButton.textContent).toBe('Sending OTP...');
  });

  it('calls passwordRecoveryRequest when the button is clicked', async () => {
    render(<ForgetPassForm {...mockProps} />);

    const otpButton = screen.getByTestId('send-otp-button');
    fireEvent.click(otpButton);

    expect(mockPasswordRecoveryRequest).toHaveBeenCalledWith({
      variables: {
        input: { email: mockProps.inputData.email },
      },
    });
  });

  it('displays an error message if an error occurs', () => {
    (usePasswordRecoveryRequestMutation as jest.Mock).mockReturnValue([mockPasswordRecoveryRequest, { loading: false, error: { message: 'Error occurred' } }]);

    render(<ForgetPassForm {...mockProps} />);

    expect(screen.getByText('Error occurred')).toBeInTheDocument();
  });
});
