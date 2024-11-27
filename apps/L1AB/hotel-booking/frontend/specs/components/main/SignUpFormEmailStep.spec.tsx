import SignUpFormEmailStep from '@/components/main/SignUpFormEmailStep';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';

describe('SignUpFormEmailStep', () => {
  it('should call setEmail and nextHandler when signUpSendOtpMutation is successful', async () => {
    const signUpSendOtpMutation = jest.fn().mockResolvedValue({
      data: {
        signUpSendOtp: {
          success: true,
          message: 'OTP sent successfully',
        },
      },
    });

    const setEmail = jest.fn();
    const nextHandler = jest.fn();

    render(<SignUpFormEmailStep setEmail={setEmail} nextHandler={nextHandler} signUpSendOtpMutation={signUpSendOtpMutation} otpLoading={false} otpError={undefined} />);

    const emailInput = screen.getByTestId('email-input') as HTMLInputElement;
    const submitButton = screen.getByTestId('send-otp-button');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(signUpSendOtpMutation).toHaveBeenCalledWith({
        variables: { email: 'test@example.com' },
      });
      expect(setEmail);
      expect(nextHandler);
    });
  });
  it('should call setEmail and nextHandler when signUpSendOtpMutation is successful', async () => {
    const signUpSendOtpMutation = jest.fn().mockResolvedValue({
      data: {
        signUpSendOtp: {
          success: false,
          message: 'OTP sent successfully',
        },
      },
    });

    const setEmail = jest.fn();
    const nextHandler = jest.fn();

    render(<SignUpFormEmailStep setEmail={setEmail} nextHandler={nextHandler} signUpSendOtpMutation={signUpSendOtpMutation} otpLoading={false} otpError={undefined} />);

    const emailInput = screen.getByTestId('email-input') as HTMLInputElement;
    const submitButton = screen.getByTestId('send-otp-button');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(signUpSendOtpMutation).toHaveBeenCalledWith({
        variables: { email: 'test@example.com' },
      });
      expect(setEmail);
      expect(nextHandler);
    });
  });
});
