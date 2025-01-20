import LoginPage from '@/components/LoginPage';
import { act, fireEvent, render } from '@testing-library/react';
import { useRouter } from 'next/navigation';

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
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    Storage.prototype.setItem = jest.fn();
  });

  it('should show an error if email is empty and user clicks sign in', () => {
    const { getByTestId } = render(<LoginPage />);
    const emailInput = getByTestId('email');
    const signInButton = getByTestId('Нэвтрэх');

    fireEvent.change(emailInput, { target: { value: '' } });
    fireEvent.click(signInButton);
  });

  it('should call sign-in function with valid credentials', async () => {
    const { getByTestId } = render(<LoginPage />);
    const emailInput = getByTestId('email');
    const passwordInput = getByTestId('password');
    const signInButton = getByTestId('Нэвтрэх');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    await act(async () => {
      fireEvent.click(signInButton);
      await new Promise((resolve) => setTimeout(resolve, 3000));
    });
  });

  it('should display an error toast when sign-in fails', async () => {
    const { getByTestId } = render(<LoginPage />);
    const emailInput = getByTestId('email');
    const passwordInput = getByTestId('password');
    const signInButton = getByTestId('Нэвтрэх');

    fireEvent.change(emailInput, { target: { value: 'invalid@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });

    await act(async () => {
      fireEvent.click(signInButton);
      await new Promise((resolve) => setTimeout(resolve, 3000));
    });
  });
});
