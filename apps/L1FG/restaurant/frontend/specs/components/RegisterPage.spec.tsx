import RegisterPage from '@/components/RegisterPage';
import { act, fireEvent, render } from '@testing-library/react';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('RegisterPage', () => {
  it('should show an error if fields empty and user clicks register', () => {
    const { getByTestId } = render(<RegisterPage />);
    const userNameInput = getByTestId('userName');
    const emailInput = getByTestId('email');
    const passwordInput = getByTestId('password');
    const rePasswordInput = getByTestId('rePassword');
    const registerButton = getByTestId('Бүртгүүлэх');

    fireEvent.change(userNameInput, { target: { value: '' } });
    fireEvent.change(emailInput, { target: { value: '' } });
    fireEvent.change(passwordInput, { target: { value: '' } });
    fireEvent.change(rePasswordInput, { target: { value: '' } });
    fireEvent.click(registerButton);
  });

  it('should handle registration successfully', async () => {
    const { getByTestId } = render(<RegisterPage />);
    const userNameInput = getByTestId('userName');
    const emailInput = getByTestId('email');
    const passwordInput = getByTestId('password');
    const rePasswordInput = getByTestId('rePassword');
    const registerButton = getByTestId('Бүртгүүлэх');

    fireEvent.change(userNameInput, { target: { value: 'testuser' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(rePasswordInput, { target: { value: 'password123' } });

    await act(async () => {
      fireEvent.click(registerButton);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });
  });
});
