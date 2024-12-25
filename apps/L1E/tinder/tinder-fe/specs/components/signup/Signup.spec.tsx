import { render, screen, fireEvent } from '@testing-library/react';
import Signup from '@/components/signup/Signup';
import { useRequestOtpMutation } from '@/generated';

jest.mock('@/generated', () => ({
  useRequestOtpMutation: jest.fn(),
}));

describe('Signup Component', () => {
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

  test('should render the signup form', () => {
    render(<Signup />);

    expect(screen.getByText(/Create an account/));
    expect(screen.getByPlaceholderText('name@example.com'));
    expect(screen.getByText('Continue'));
  });

  test('should show error for invalid email', () => {
    render(<Signup />);

    const emailInput = screen.getByPlaceholderText('name@example.com');
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.click(screen.getByTestId('continue-btn'));

    expect(screen.getByText('Please enter a valid email address.'));
  });

  test('should move to confirmation step on valid email', () => {
    render(<Signup />);

    const emailInput = screen.getByPlaceholderText('name@example.com');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByTestId('continue-btn'));

    expect(screen.getByText('Confirm email'));
  });
});
