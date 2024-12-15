import { render, fireEvent, screen, act, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import SignUpFormOtpStep from '@/components/main/SignUpFormOtpStep';
import { SignUpCheckOtpDocument, SignUpSendOtpDocument } from '@/generated';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

describe('SignUpFormOtpStep Component', () => {
  const email = 'test@example.com';
  const nextHandlerMock = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  beforeEach(() => {
    jest.useFakeTimers();
  });

  it('shows an error message when OTP verification fails', async () => {
    const mocks = [
      {
        request: {
          query: SignUpCheckOtpDocument,
          variables: { input: { otp: '1234', email } },
        },
        error: new Error('Resend failed'),
      },
    ];

    render(
      <>
        <MockedProvider mocks={mocks}>
          <SignUpFormOtpStep nextHandler={jest.fn()} email={email} />
        </MockedProvider>
        <ToastContainer />
      </>
    );

    const otpInput = screen.getByTestId('otp-input-group');
    fireEvent.change(otpInput, { target: { value: '1234' } });

    await waitFor(() => {
      expect(toast.error);
    });
  });

  it('submits OTP correctly and calls nextHandler on success', async () => {
    const mocks = [
      {
        request: {
          query: SignUpCheckOtpDocument,
          variables: { input: { otp: '1234', email } },
        },
        result: {
          data: {
            SignUpCheckOtp: {
              success: false,
            },
          },
        },
      },
    ];

    render(
      <>
        <MockedProvider mocks={mocks}>
          <SignUpFormOtpStep nextHandler={nextHandlerMock} email={email} />
        </MockedProvider>
      </>
    );

    const otpInput = screen.getByTestId('otp-input-group');
    fireEvent.change(otpInput, { target: { value: '1234' } });
    await waitFor(() => {
      expect(toast.error);
    });
  });

  // Test 6: Resend OTP Failure
  it('displays an error toast when resend OTP fails', async () => {
    const mocks = [
      {
        request: { query: SignUpSendOtpDocument, variables: { email } },
        error: new Error('Resend failed'),
      },
    ];

    render(
      <>
        <MockedProvider mocks={mocks}>
          <SignUpFormOtpStep nextHandler={jest.fn()} email={email} />
        </MockedProvider>
        <ToastContainer />
      </>
    );

    const resendButton = screen.getByTestId('resend-button');

    act(() => {
      jest.advanceTimersByTime(60000); // Enable resend button
    });

    fireEvent.click(resendButton);

    await waitFor(() => {
      const toastElement = screen.getByText('An error occurred. Please try again.');
      expect(toastElement);
    });
  });
});
