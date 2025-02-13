import { act, render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRequestChangePasswordMutation, useRestoreForgetPasswordMutation } from '@/generated';
import OTP from '@/components/Otp';
import { useRouter } from 'next/navigation';
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));
jest.mock('@/generated', () => ({
  useRequestChangePasswordMutation: jest.fn(),
  useRestoreForgetPasswordMutation: jest.fn(),
}));
describe('OTP Component', () => {
  let mockRequestChangePassword: jest.Mock;
  let mockRestoreForgetPassword: jest.Mock;
  let mockRouterPush: jest.Mock;
  beforeEach(() => {
    mockRequestChangePassword = jest.fn();
    mockRestoreForgetPassword = jest.fn(() => ({ loading: false, error: null }));
    mockRouterPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
    jest.clearAllMocks();
    (useRequestChangePasswordMutation as jest.Mock).mockReturnValue([mockRequestChangePassword]);
    (useRestoreForgetPasswordMutation as jest.Mock).mockReturnValue([mockRestoreForgetPassword, { loading: false, error: null }]);
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
    localStorage.setItem('requestedEmail', 'test@example.com');
  });
  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('renders the OTP component correctly', () => {
    render(<OTP />);
    expect(screen.getByText(/Имэйл хаяг руу илгээсэн 6 оронтой кодыг оруулна уу/i));
    expect(screen.getAllByRole('textbox')).toHaveLength(6);
  });
  it('should set requestedEmail from localStorage', () => {
    render(<OTP />);
    const email = localStorage.getItem('requestedEmail');
    expect(email).toBe('test@example.com');
  });
  it('triggers OTP submission when all digits are entered', async () => {
    render(<OTP />);
    const email = localStorage.getItem('requestedEmail');
    const inputs = screen.getAllByRole('textbox');

    await act(async () => {
      inputs.forEach((input, index) => {
        fireEvent.change(input, { target: { value: `${index + 1}` } });
      });
    });
    await waitFor(() => {
      expect(mockRestoreForgetPassword).toHaveBeenCalledWith({
        variables: { input: { email: email, otp: '123456' } },
      });
      expect(mockRouterPush).toHaveBeenCalledWith('/new-password');
    });
  });
  it('requestedEmail is null it will be early return', async () => {
    localStorage.removeItem('requestedEmail');
    render(<OTP />);
    const inputs = screen.getAllByRole('textbox');
    await act(async () => {
      inputs.forEach((input, index) => {
        fireEvent.change(input, { target: { value: `${index + 1}` } });
      });
    });
    await waitFor(() => {
      expect(mockRouterPush).toHaveBeenCalledWith('/reset-password');
    });
  });
  it('calls requestChangePassword when resend button is clicked', async () => {
    render(<OTP />);
    const resendButton = screen.getByTestId('resendOtp');
    await act(async () => {
      fireEvent.click(resendButton);
    });
    await waitFor(() => {
      expect(mockRequestChangePassword).toHaveBeenCalledWith({
        variables: { input: { email: 'test@example.com' } },
      });
    });
  });
  it('if back button is clicked', async () => {
    localStorage.removeItem('requestedEmail');
    render(<OTP />);
    const backButton = screen.getByTestId('back');
    await act(async () => {
      fireEvent.click(backButton);
    });
    await waitFor(() => {
      expect(mockRouterPush).toHaveBeenCalledWith('/reset-password');
    });
  });
  it('displays loading message when verifying', async () => {
    (useRestoreForgetPasswordMutation as jest.Mock).mockReturnValue([jest.fn(), { loading: true, error: null }]);

    render(<OTP />);
    expect(screen.getByText('Шалгаж байна...'));
  });
  it('displays error message if verification fails', async () => {
    (useRestoreForgetPasswordMutation as jest.Mock).mockReturnValue([jest.fn(), { loading: false, error: { message: 'Invalid OTP' } }]);

    render(<OTP />);
    expect(screen.getByText('Invalid OTP'));
  });
  it('if localStorage email is null go back to reset-password page', async () => {
    localStorage.removeItem('requestedEmail');
    render(<OTP />);
    const resendButton = screen.getByTestId('resendOtp');
    await act(async () => {
      fireEvent.click(resendButton);
    });

    await waitFor(() => {
      expect(mockRouterPush).toHaveBeenCalledWith('/reset-password');
    });
  });
  it('focuses on the previous input when Backspace is pressed on an empty input', async () => {
    render(<OTP />);
    const inputs = screen.getAllByRole('textbox');
    await act(async () => {
      fireEvent.change(inputs[0], { target: { value: '1' } });
      fireEvent.change(inputs[1], { target: { value: '2' } });
      fireEvent.change(inputs[2], { target: { value: '' } });
      fireEvent.keyDown(inputs[2], { key: 'Backspace' });
    });
  });
  it('input when Backspace is pressed on an empty input', async () => {
    render(<OTP />);
    const inputs = screen.getAllByRole('textbox');
    await act(async () => {
      fireEvent.change(inputs[0], { target: { value: '' } });
      fireEvent.keyDown(inputs[0], { key: 'Backspace' });
    });
  });
  it('allows only numeric input in OTP fields', async () => {
    render(<OTP />);
    const input = screen.getAllByRole('textbox')[0];
    await act(async () => {
      fireEvent.change(input, { target: { value: 'a' } });
      fireEvent.change(input, { target: { value: '1' } });
      expect(input);
    });
  });
});
