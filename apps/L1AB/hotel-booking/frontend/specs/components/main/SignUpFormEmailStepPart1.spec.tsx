import { MockedProvider } from '@apollo/client/testing';
import SignUpFormEmailStep from '@/components/main/SignUpFormEmailStep';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SignUpSendOtpDocument } from '@/generated';

describe('SignUpFormEmailStep', () => {
  it('should call setEmail and nextHandler when signUpSendOtpMutation is successful', async () => {
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
              message: 'OTP sent successfully',
            },
          },
        },
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
      expect(setEmail).toHaveBeenCalledWith('test@example.com');
      expect(nextHandler).toHaveBeenCalled();

      expect(screen.getByText('OTP sent successfully. Please check your email'));
    });
  });

  it('should show an error toast when signUpSendOtpMutation success is false', async () => {
    const mocks = [
      {
        request: {
          query: SignUpSendOtpDocument,
          variables: { email: 'test@example.com' },
        },
        result: {
          data: {
            signUpSendOtp: {
              success: false,
              message: 'Something went wrong. Please try again.',
            },
          },
        },
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
      expect(screen.getByText('Something went wrong. Please try again.'));
    });
  });
});
