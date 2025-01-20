import LoginPage from '@/components/LoginPage';
import { act, fireEvent, render } from '@testing-library/react';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

describe('Signin', () => {
  it('should show an error if fields empty and user clicks sign in', () => {
    const { getByTestId } = render(<LoginPage />);
    const emailInput = getByTestId('email');
    const passwordInput = getByTestId('password');
    const signInButton = getByTestId('Нэвтрэх');

    fireEvent.change(emailInput, { target: { value: '' } });
    fireEvent.change(passwordInput, { target: { value: '' } });
    fireEvent.click(signInButton);
  });
  it('should handle registration successfully', async () => {
    const { getByTestId } = render(<LoginPage />);
    const emailInput = getByTestId('email');
    const passwordInput = getByTestId('password');
    const signInButton = getByTestId('Нэвтрэх');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    await act(async () => {
      fireEvent.click(signInButton);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });
  });
});
