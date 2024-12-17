import '@testing-library/jest-dom';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { SignInForm } from '@/components/main';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const mockSignIn = jest.fn();
let mockSignInLoading = false;

jest.mock('@/components/providers/Auth.Provider', () => ({
  useAuth: jest.fn().mockImplementation(() => ({
    signin: mockSignIn,
    signInLoading: mockSignInLoading,
  })),
}));

describe('Main Sign In Form', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('displays an error toast message when sign-in fails', async () => {
    mockSignIn.mockRejectedValueOnce({ message: 'Error' });
    mockSignInLoading = false;

    const { getByTestId, getByText } = render(
      <>
        <ToastContainer />
        <SignInForm />
      </>
    );

    const email = getByTestId('email-input');
    const password = getByTestId('password-input');
    const continueBtn = getByTestId('continue-btn');

    fireEvent.change(email, { target: { value: 'test@example.com' } });
    fireEvent.change(password, { target: { value: 'passwordTest2000' } });

    act(() => {
      fireEvent.click(continueBtn);
    });

    await waitFor(() => {
      expect(getByText('An error occurred. Please try again.')).toBeInTheDocument();
    });
  });

  it('does not display an error toast message when sign-in succeeds', async () => {
    mockSignIn.mockResolvedValueOnce({ message: 'success' });
    mockSignInLoading = false;

    const { getByTestId, queryByText } = render(
      <>
        <ToastContainer />
        <SignInForm />
      </>
    );

    const email = getByTestId('email-input');
    const password = getByTestId('password-input');
    const continueBtn = getByTestId('continue-btn');

    fireEvent.change(email, { target: { value: 'test@example.com' } });
    fireEvent.change(password, { target: { value: 'passwordTest2000' } });

    act(() => {
      fireEvent.click(continueBtn);
    });

    await waitFor(() => {
      expect(queryByText('An error occurred. Please try again.')).not.toBeInTheDocument();
    });
  });

  it('displays "Continue..." when signInLoading is true', async () => {
    mockSignIn.mockResolvedValueOnce({ message: 'success' });
    mockSignInLoading = true;

    const { getByTestId, getByText } = render(
      <>
        <ToastContainer />
        <SignInForm />
      </>
    );

    const continueBtn = getByTestId('continue-btn');

    expect(getByText('Continue...')).toBeInTheDocument();
    expect(continueBtn).toBeDisabled();

    act(() => {
      fireEvent.click(continueBtn);
    });

    await waitFor(() => {
      expect(continueBtn).toHaveTextContent('Continue...');
    });
  });
});
