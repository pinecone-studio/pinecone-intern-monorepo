import { useAuth } from '@/components/providers/AuthProvider';
import { SignUp } from '@/components/signUp/SignUp';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { toast } from 'react-toastify';

jest.mock('../../../src/components/providers/AuthProvider', () => ({
  useAuth: jest.fn(),
}));

jest.mock('react-toastify', () => ({
  toast: { info: jest.fn() },
}));
describe('SignUp ', () => {
  it('repeatpassword and password not match', async () => {
    const mockSignup = jest.fn();
    (useAuth as jest.Mock).mockReturnValue({ signup: mockSignup });
    const { getByTestId } = render(<SignUp />);
    await act(async () => {
      fireEvent.change(getByTestId('signup-email-input'), { target: { value: 'email' } });
    });
    await act(async () => {
      fireEvent.change(getByTestId('signup-password-input'), { target: { value: 'password' } });
    });
    await act(async () => {
      fireEvent.change(getByTestId('signup-repeatpassword-input'), { target: { value: 'repeatpassword' } });
    });
    await act(async () => {
      fireEvent.click(getByTestId('signup-button'));
    });
    await act(async () => {
      fireEvent.submit(getByTestId('signup-form-onSubmit-button'));
    });
    await waitFor(() => {
      expect(toast.info).toHaveBeenCalledWith('Нууц үгийг давтан хийнэ үү');
    });
    expect(mockSignup).toHaveBeenCalled();
  });

  it('SignUp  render successfully', async () => {
    const mockSignup = jest.fn();
    (useAuth as jest.Mock).mockReturnValue({ signup: mockSignup });
    const { getByTestId } = render(<SignUp />);

    await act(async () => {
      fireEvent.change(getByTestId('signup-email-input'));
    });
    await act(async () => {
      fireEvent.change(getByTestId('signup-password-input'));
    });
    await act(async () => {
      fireEvent.change(getByTestId('signup-repeatpassword-input'));
    });
    await act(async () => {
      fireEvent.click(getByTestId('signup-button'));
    });
    await act(async () => {
      fireEvent.submit(getByTestId('signup-form-onSubmit-button'));
    });
    expect(getByTestId('signup-form-onSubmit-button')).toBeDefined();
  });
});
