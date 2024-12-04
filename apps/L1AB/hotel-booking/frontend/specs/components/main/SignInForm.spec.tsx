import '@testing-library/jest-dom';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { SignInForm } from '@/components/main';

jest.mock('@/components/providers/Auth.Provider', () => ({
  useAuth: jest.fn().mockReturnValue({
    signin: jest.fn().mockRejectedValueOnce({ message: 'Error' }).mockResolvedValueOnce({ message: 'success' }),
  }),
}));

describe('Main Sign In Form', () => {
  it('should render the main sign in form', async () => {
    const { getByTestId } = render(<SignInForm />);

    const email = getByTestId('email-input');
    const password = getByTestId('password-input');

    fireEvent.change(email, { target: { value: 'test@example.com' } });
    fireEvent.change(password, { target: { value: 'passwordTest2000' } });

    const continueBtn = getByTestId('continue-btn');

    act(() => {
      fireEvent.click(continueBtn);
    });

    await waitFor(() => expect(getByTestId('ErrorSignIn')).toBeDefined());
  });

  it('should render the main sign in form', async () => {
    const { getByTestId } = render(<SignInForm />);

    const email = getByTestId('email-input');
    const password = getByTestId('password-input');

    fireEvent.change(email, { target: { value: 'test@example.com' } });
    fireEvent.change(password, { target: { value: 'passwordTest2000' } });

    const continueBtn = getByTestId('continue-btn');

    act(() => {
      fireEvent.click(continueBtn);
    });
  });
});
