import { render, fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import { SignUpDocument, SignUpSendOtpDocument } from '@/generated';
import SignUpForm from '@/components/main/SignUpForm';

describe('SignUpForm', () => {
  it('should complete the sign-up process successfully', async () => {
    window.alert = jest.fn(); // Mock alert to prevent actual alert popup

    const mocks = [
      {
        request: {
          query: SignUpSendOtpDocument,
          variables: { email: 'test@example.com' },
        },
        result: {
          data: {
            signUpSendOtp: {
              success: true,
              message: 'OTP sent successfully. Please check your email.',
            },
          },
        },
      },
      {
        request: {
          query: SignUpDocument,
          variables: {
            input: { email: 'test@example.com', password: 'strongpassword' },
          },
        },
        result: {
          data: {
            signUp: {
              success: true,
              message: 'User test@example.com created successfully',
              user: { _id: '12', phone: '99119911', isAdmin: false, email: 'test@example.com', createdAt: '2024-11-14T06:24:52.763Z', updatedAt: '2024-11-14T06:24:52.763Z' },
            },
          },
        },
      },
    ];

    const { getByTestId, queryByTestId } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SignUpForm />
      </MockedProvider>
    );
    fireEvent.change(getByTestId('email-input'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.click(getByTestId('send-otp-button'));

    await waitFor(() => {
      expect(queryByTestId('email-input')).toBeNull();
    });
    fireEvent.change(getByTestId('otp-input'), {
      target: { value: '1234' },
    });
    fireEvent.click(getByTestId('verify-otp-button'));

    await waitFor(() => {
      expect(queryByTestId('otp-input')).toBeNull();
    });

    fireEvent.change(getByTestId('password-input'), {
      target: { value: 'strongpassword' },
    });
    fireEvent.change(getByTestId('confirm-password-input'), {
      target: { value: 'strongpassword' },
    });
    fireEvent.click(getByTestId('sign-up-button'));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('User created successfully!');
    });
  });
});
