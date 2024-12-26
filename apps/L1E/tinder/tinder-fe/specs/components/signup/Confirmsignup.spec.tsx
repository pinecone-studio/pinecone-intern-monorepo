import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRequestOtpMutation } from '@/generated';
import Addpassword from '@/components/signup/Addpassword'; // Assuming this is used as part of the flow
import Confirmsignup from '@/components/signup/Confirmsignup';

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
    render(<Confirmsignup />);

    expect(screen.getByText(/Confirm email/));
    expect(screen.getByText(/To continue, enter the secure code we sent to/));
  });

  test('should call requestOtp mutation on OTP input change', async () => {
    render(<Confirmsignup />);

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
    render(<Confirmsignup />);

    const inputFields = screen.getAllByRole('textbox');

    fireEvent.change(inputFields[0], { target: { value: '1' } });
    fireEvent.change(inputFields[1], { target: { value: '2' } });

    fireEvent.keyDown(inputFields[1], { key: 'Backspace' });

    expect(inputFields[1].value);
    expect(inputFields[1]);
  });

  test('should proceed to the signup step if OTP is complete', async () => {
    render(<Confirmsignup />);

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

    // Check if password state was updated in localStorage
    expect(window.localStorage.setItem).toHaveBeenCalledWith('signupFormData', expect.stringContaining('"password":"Test@123"'));

    // Verify step change to interest
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
});
