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

  it('renders the OTP form UI correctly', () => {
    render(
      <>
        <MockedProvider>
          <SignUpFormOtpStep nextHandler={jest.fn()} email={email} />
        </MockedProvider>
        <ToastContainer />
      </>
    );

    // Check static UI elements
    expect(screen.getByText('Confirm email')).toBeInTheDocument();
    expect(screen.getByText(/To continue, enter the secure code/)).toBeInTheDocument();
    expect(screen.getByTestId('otp-input-group')).toBeInTheDocument();
    expect(screen.getByTestId('resend-button')).toBeInTheDocument();
  });

  // Test 2: Timer Functionality
  it('disables resend button while timer is running and re-enables it after 60 seconds', () => {
    render(
      <>
        <MockedProvider>
          <SignUpFormOtpStep nextHandler={jest.fn()} email={email} />
        </MockedProvider>
      </>
    );

    const resendButton = screen.getByTestId('resend-button');

    // Initially disabled
    expect(resendButton).toBeDisabled();
    expect(resendButton).toHaveTextContent('Send again (60s)');

    act(() => {
      jest.advanceTimersByTime(60000); // Simulate 60 seconds passing
    });

    // Now enabled
    expect(resendButton).toBeEnabled();
    expect(resendButton).toHaveTextContent('Send again');
  });

  // Test 3: Resend OTP
  it('resets timer and OTP after clicking resend', async () => {
    const mocks = [
      {
        request: { query: SignUpSendOtpDocument, variables: { email } },
        result: { data: { signUpSendOtp: { success: true } } },
      },
    ];

    render(
      <>
        <MockedProvider mocks={mocks}>
          <SignUpFormOtpStep nextHandler={jest.fn()} email={email} />
        </MockedProvider>
      </>
    );

    const resendButton = screen.getByTestId('resend-button');

    // Fast-forward timer to enable resend button
    act(() => {
      jest.advanceTimersByTime(60000);
    });

    fireEvent.click(resendButton);

    await waitFor(() => {
      expect(resendButton).toBeDisabled(); // Timer resets
      expect(screen.getByTestId('otp-input-group')).toBeInTheDocument();
    });
  });

  // Test 4: OTP Submission Success
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
              message: 'OTP verified successfully',
              success: true,
              __typename: 'Response',
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
      expect(nextHandlerMock).toHaveBeenCalledTimes(1);
      expect(toast.success).toHaveBeenCalledWith('OTP verified successfull');
    });
  });
});
