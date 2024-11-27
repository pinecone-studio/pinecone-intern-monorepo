import { render, fireEvent, waitFor } from '@testing-library/react';
import SignUpFormPasswordStep from '@/components/main/SignUpFormPasswordStep';

describe('Sign Up Form Password Step', () => {
  it('should show alert when sign-up is successful', async () => {
    const signUpMutation = jest.fn().mockResolvedValue({
      data: {
        signUp: {
          success: true,
          message: 'User created successfully!',
          user: {
            email: 'test@example.com',
          },
        },
      },
    });

    window.alert = jest.fn();

    const { getByTestId } = render(<SignUpFormPasswordStep email="test@example.com" otp="1234" signUpMutation={signUpMutation} signUpLoading={false} signUpError={undefined} />);

    const passwordInput = getByTestId('password-input') as HTMLInputElement;
    const confirmPasswordInput = getByTestId('confirm-password-input') as HTMLInputElement;
    const submitButton = getByTestId('sign-up-button');

    fireEvent.change(passwordInput, { target: { value: 'strongpassword' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'strongpassword' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(signUpMutation).toHaveBeenCalledWith({
        variables: {
          input: {
            email: 'test@example.com',
            otp: '1234',
            password: 'strongpassword',
          },
        },
      });

      expect(window.alert);
    });
  });
  it('should show alert when sign-up is successful', async () => {
    const signUpMutation = jest.fn().mockResolvedValue({
      data: {
        signUp: {
          success: false,
          message: 'User created successfully!',
          user: {
            email: 'test@example.com',
          },
        },
      },
    });

    window.alert = jest.fn();

    const { getByTestId } = render(<SignUpFormPasswordStep email="test@example.com" otp="1234" signUpMutation={signUpMutation} signUpLoading={false} signUpError={undefined} />);

    const passwordInput = getByTestId('password-input') as HTMLInputElement;
    const confirmPasswordInput = getByTestId('confirm-password-input') as HTMLInputElement;
    const submitButton = getByTestId('sign-up-button');

    fireEvent.change(passwordInput, { target: { value: 'strongpassword' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'strongpassword' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(signUpMutation).toHaveBeenCalledWith({
        variables: {
          input: {
            email: 'test@example.com',
            otp: '1234',
            password: 'strongpassword',
          },
        },
      });

      expect(window.alert);
    });
  });
});
