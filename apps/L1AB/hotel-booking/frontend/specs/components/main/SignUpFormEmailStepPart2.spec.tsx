import { MockedProvider } from '@apollo/client/testing';
import SignUpFormEmailStep from '@/components/main/SignUpFormEmailStep';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SignUpCheckOtpDocument, SignUpSendOtpDocument } from '@/generated';
import SignUpForm from '@/components/main/SignUpForm';

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

describe('SignUpFormEmailStep', () => {
  it('should show a generic error toast when signUpSendOtpMutation throws an error', async () => {
    const mocks = [
      {
        request: {
          query: SignUpSendOtpDocument,
          variables: { email: 'test@example.com' },
        },
        error: new Error('Network error'),
      },
    ];

    const setEmail = jest.fn();
    const nextHandler = jest.fn();

    render(
      <>
        <MockedProvider mocks={mocks} addTypename={false}>
          <SignUpFormEmailStep setEmail={setEmail} nextHandler={nextHandler} />
        </MockedProvider>
        <ToastContainer />
      </>
    );

    const emailInput = screen.getByTestId('email-input') as HTMLInputElement;
    const submitButton = screen.getByTestId('send-otp-button');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('An error occurred. Please try again.'));
    });
  });
  it(' OTP success', async () => {
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
          query: SignUpCheckOtpDocument,
          variables: { input: { otp: '1234', email: 'test@example.com' } },
        },
        result: {
          data: {
            signUpCheckOtp: {
              success: false,
            },
          },
        },
      },
    ];

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SignUpForm />
      </MockedProvider>
    );

    fireEvent.change(screen.getByTestId('email-input'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.click(screen.getByTestId('send-otp-button'));

    await waitFor(() => {
      expect(screen.getByTestId('otp-input-group'));
    });

    fireEvent.change(screen.getByTestId('otp-input-group'), {
      target: { value: '1234' },
    });

    await waitFor(() => {
      expect(toast.success);
    });
  });
});
