import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRequestOtpMutation } from '@/generated';
import Addpassword from '@/components/signup/Addpassword';
import Otp from '@/components/signup/Otp';

jest.mock('@/generated', () => ({
  useRequestOtpMutation: jest.fn(),
}));

describe('Confirmsignup Component', () => {
  const mockRequestOtp = jest.fn();

  beforeEach(() => {
    mockRequestOtp.mockClear();
    (useRequestOtpMutation as jest.Mock).mockReturnValue([mockRequestOtp]);

    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn().mockReturnValue(JSON.stringify({ email: 'test@example.com' })),
        setItem: jest.fn(),
      },
      writable: true,
    });
  });

  test('should render the confirmation OTP input fields', () => {
    render(<Otp />);

    expect(screen.getByText(/Confirm email/));
    expect(screen.getByText(/To continue, enter the secure code we sent to/));
  });

  test('should call requestOtp mutation on OTP input change', async () => {
    render(<Otp />);

    const inputFields = screen.getAllByRole('textbox');

    fireEvent.change(inputFields[0], { target: { value: '1' } });
    fireEvent.change(inputFields[1], { target: { value: '2' } });
    fireEvent.change(inputFields[2], { target: { value: '3' } });
    fireEvent.change(inputFields[3], { target: { value: '4' } });

    await waitFor(() => {
      expect(mockRequestOtp).toHaveBeenCalledWith({
        variables: {
          input: {
            email: 'test@example.com',
            otp: '1234',
          },
        },
      });
    });
  });
  test('should handle backspace keypress correctly', async () => {
    render(<Otp />);

    const inputFields = screen.getAllByRole('textbox');

    fireEvent.change(inputFields[0], { target: { value: '1' } });
    fireEvent.change(inputFields[1], { target: { value: '2' } });

    fireEvent.keyDown(inputFields[1], { key: 'Backspace' });

    expect(inputFields[1].value);
    expect(inputFields[1]);
  });
  test('should proceed to the signup step if OTP is complete', async () => {
    render(<Otp />);

    const inputFields = screen.getAllByRole('textbox');

    fireEvent.change(inputFields[0], { target: { value: '1' } });
    fireEvent.change(inputFields[1], { target: { value: '2' } });
    fireEvent.change(inputFields[2], { target: { value: '3' } });
    fireEvent.change(inputFields[3], { target: { value: '4' } });

    await waitFor(() => {
      expect(mockRequestOtp).toHaveBeenCalledWith({
        variables: {
          input: {
            email: 'test@example.com',
            otp: '1234',
          },
        },
      });
    });
  });

  test('should navigate to Addpassword when OTP is valid', async () => {
    render(<Addpassword />);

    const passwordInput = screen.getByPlaceholderText('Password');
    const confirmPasswordInput = screen.getByPlaceholderText('Password repeat');
    const continueButton = screen.getByTestId('continue-btn');

    fireEvent.change(passwordInput, { target: { value: 'Test@123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'Test@123' } });
    fireEvent.click(continueButton);

    expect(window.localStorage.setItem).toHaveBeenCalledWith('signupFormData', expect.stringContaining('"password":"Test@123"'));
  });

  test('should show an error if passwords do not match', () => {
    render(<Addpassword />);

    const passwordInput = screen.getByPlaceholderText('Password');
    const confirmPasswordInput = screen.getByPlaceholderText('Password repeat');
    const continueButton = screen.getByTestId('continue-btn');

    fireEvent.change(passwordInput, { target: { value: 'Test@123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'DifferentPassword' } });
    fireEvent.click(continueButton);

    expect(screen.getByText('Passwords do not match.'));
  });

  test('should show an error if password is too short', () => {
    render(<Addpassword />);

    const passwordInput = screen.getByPlaceholderText('Password');
    const confirmPasswordInput = screen.getByPlaceholderText('Password repeat');
    const continueButton = screen.getByTestId('continue-btn');

    fireEvent.change(passwordInput, { target: { value: '123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: '123' } });
    fireEvent.click(continueButton);

    expect(screen.getByText('Password must be at least 5 characters long.'));
  });
  it('should move focus to the previous input when Backspace is pressed on an empty input', () => {
    render(<Otp />);
    const inputs = screen.getAllByRole('textbox');
    const firstInput = inputs[0];
    const secondInput = inputs[1];
    fireEvent.focus(secondInput);
    fireEvent.keyDown(secondInput, { key: 'Backspace' });

    expect(document.activeElement).toBe(firstInput);
  });

  it('should not move focus when Backspace is pressed and the input is not empty', () => {
    render(<Otp />);
    const inputs = screen.getAllByRole('textbox');
    const secondInput = inputs[1];
    fireEvent.change(secondInput, { target: { value: '1' } });
    fireEvent.keyDown(secondInput, { key: 'Backspace' });
  });

  it('should not move focus when Backspace is pressed on the first input', () => {
    render(<Otp />);
    const inputs = screen.getAllByRole('textbox');
    const firstInput = inputs[0];
    fireEvent.keyDown(firstInput, { key: 'Backspace' });
    expect(document.activeElement).toBe(firstInput);
  });
});
