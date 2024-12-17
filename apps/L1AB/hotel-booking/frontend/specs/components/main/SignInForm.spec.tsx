import '@testing-library/jest-dom';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { SignInForm } from '@/components/main';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

jest.mock('@/components/providers/Auth.Provider', () => ({
  useAuth: jest.fn().mockReturnValue({
    signin: jest.fn().mockRejectedValueOnce({ message: 'Error' }).mockResolvedValueOnce({ message: 'success' }),
    signInLoading: false,
  }),
}));

describe('Main Sign In Form', () => {
  it('should render the main sign in form', async () => {
    const { getByTestId, getByText } = render(
      <>
        <ToastContainer />
        <SignInForm />
      </>
    );

    const email = getByTestId('email-input');
    const password = getByTestId('password-input');

    fireEvent.change(email, { target: { value: 'test@example.com' } });
    fireEvent.change(password, { target: { value: 'passwordTest2000' } });

    const continueBtn = getByTestId('continue-btn');

    console.log(continueBtn);

    act(() => {
      fireEvent.click(continueBtn);
    });

    await waitFor(() => expect(getByText('An error occurred. Please try again.')));
  });

  it('should render the main sign in form', async () => {
    const { getByTestId } = render(
      <>
        <ToastContainer />
        <SignInForm />
      </>
    );

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
