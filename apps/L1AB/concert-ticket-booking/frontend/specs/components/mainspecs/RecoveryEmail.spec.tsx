import RecoveryEmail from '@/components/maincomponents/RecoveryEmail';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useAuth } from '@/components';

jest.mock('@/components', () => ({
  useAuth: jest.fn(),
}));

describe('RecoveryEmail-Page', () => {
  it('should render recovery email page', async () => {
    const { getByTestId } = render(<RecoveryEmail header="OTP хүсэлт илгээх" emailLabel="Имэйл хаяг:" buttonText="Хүсэлт илгээх" />);
    const clickSubmit = getByTestId('send-otp-request-button');
    fireEvent.click(clickSubmit);
  });

  it('should send email successfully', async () => {
    const requestPasswordRecoveryMock = jest.fn().mockResolvedValue({ success: true });
    (useAuth as jest.Mock).mockReturnValue({ requestPasswordRecovery: requestPasswordRecoveryMock });

    render(<RecoveryEmail header="OTP хүсэлт илгээх" emailLabel="Имэйл хаяг:" buttonText="Хүсэлт илгээх" />);

    const emailInput = screen.getByPlaceholderText('name@example.com');
    const submitButton = screen.getByText('Хүсэлт илгээх');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(requestPasswordRecoveryMock).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(requestPasswordRecoveryMock).toHaveBeenCalledTimes(1);
    });
  });

  it('should throw user not found error', async () => {
    const error = new Error('User not found');
    const requestPasswordRecoveryMock = jest.fn().mockRejectedValue(error);
    (useAuth as jest.Mock).mockReturnValue({ requestPasswordRecovery: requestPasswordRecoveryMock });

    render(<RecoveryEmail header="OTP хүсэлт илгээх" emailLabel="Имэйл хаяг:" buttonText="Хүсэлт илгээх" />);

    const emailInput = screen.getByPlaceholderText('name@example.com');
    const submitButton = screen.getByText('Хүсэлт илгээх');

    fireEvent.change(emailInput, { target: { value: 'nonexistent@example.com' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(requestPasswordRecoveryMock).toHaveBeenCalledWith({ email: 'nonexistent@example.com' });
      // Check if an error message would display (you need to add this behavior to your component)
    });
  });

  it('should change button label depending on loading state', async () => {
    const requestPasswordRecoveryMock = jest.fn().mockResolvedValue({ success: true });
    (useAuth as jest.Mock).mockReturnValue({ requestPasswordRecovery: requestPasswordRecoveryMock });

    render(<RecoveryEmail header="OTP хүсэлт илгээх" emailLabel="Имэйл хаяг:" buttonText="Хүсэлт илгээх" />);

    const emailInput = screen.getByPlaceholderText('name@example.com');
    const submitButton = screen.getByText('Хүсэлт илгээх');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);

    expect(screen.getByText('Илгээж байна...')).toBeInTheDocument(); // Check loading state

    await waitFor(() => {
      expect(screen.getByText('Хүсэлт илгээх')).toBeInTheDocument(); // Button text should revert after loading
    });
  });
});
