import SignUpFormOtpStep from '@/components/main/SignUpFormOtpStep';
import { render, fireEvent, waitFor, act } from '@testing-library/react';

describe('SignUpFormOtpStep', () => {
  it('should render and submit OTP', async () => {
    const setOtp = jest.fn();
    const nextHandler = jest.fn();

    const { getByTestId } = render(<SignUpFormOtpStep setOtp={setOtp} nextHandler={nextHandler} email="test@example.com" />);

    const otpInput = getByTestId('otp-input') as HTMLInputElement;
    const submitButton = getByTestId('verify-otp-button');

    // Simulate user typing in the OTP
    await act(async () => {
      fireEvent.change(otpInput, { target: { value: '1234' } });
    });

    // Simulate form submission
    await act(async () => {
      fireEvent.click(submitButton);
    });

    // Wait for state updates to complete
    await waitFor(() => {
      expect(setOtp).toHaveBeenCalledWith('1234');
      expect(nextHandler).toHaveBeenCalled();
    });
  });
});
