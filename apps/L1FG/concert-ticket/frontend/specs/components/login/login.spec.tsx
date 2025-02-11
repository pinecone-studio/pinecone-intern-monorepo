import Login from '@/components/login/SignIn';
import { useAuth } from '@/components/providers/AuthProvider';
import { act, fireEvent, render } from '@testing-library/react';

jest.mock('../../../src/components/providers/AuthProvider', () => ({
  useAuth: jest.fn(),
}));
describe('login', () => {
  it('login render successfullyy', async () => {
    const mockSignin = jest.fn();

    (useAuth as jest.Mock).mockReturnValue({ signin: mockSignin });

    const { getByTestId } = render(<Login />);

    const emailInput = getByTestId('login-email-input');

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: 'email' } });
    });

    const passwordInput = getByTestId('login-password-input');

    await act(async () => {
      fireEvent.change(passwordInput, { target: { value: 'password' } });
    });

    const button = getByTestId('login-button');

    await act(async () => {
      fireEvent.click(button);
    });

    await act(async () => {
      fireEvent.submit(getByTestId('login-form-onSubmit-button'));
    });

    expect(getByTestId('login-form-onSubmit-button')).toBeDefined();
  });
});
