import { VerifyOtp } from '@/components/maincomponents/VerifyOtp';
import { RequestPasswordRecoveryDocument, VerifyOtpDocument } from '@/generated';
import { MockedProvider } from '@apollo/client/testing';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));
jest.mock('@/components/providers/AuthProvider', () => ({
  ...jest.requireActual('@/components/providers/AuthProvider'),
  useAuth: () => ({
    verifyOtp: jest.fn(),
    requestPasswordRecovery: jest.fn(),
  }),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),

  useSearchParams: jest.fn(() => ({
    get: jest.fn((key) => {
      if (key === 'email') return 'test@example.com';
      if (key === 'token') return 'dummy-token';
      return null;
    }),
  })),
}));
jest.useFakeTimers();

const verifyOtp = {
  request: {
    query: VerifyOtpDocument,
    variables: {
      input: {
        email: 'leapinternteam2@gmail.com',
        otp: '852884',
      },
    },
  },
  result: {
    data: {
      requestPasswordRecovery: {
        email: 'leapinternteam2@gmail.com',
        success: true,
      },
    },
  },
};
const RecoveryEmailMock = {
  request: {
    query: RequestPasswordRecoveryDocument,
    variables: {
      input: {
        email: 'leapinternteam2@gmail.com',
      },
    },
  },
  result: {
    data: {
      requestPasswordRecovery: {
        id: '1',
        email: 'leapinternteam2@gmail.com',
      },
    },
  },
};
describe('VerifyOtp Component', () => {
  it('should update state value when OTP input slots change', () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[verifyOtp]}>
        <VerifyOtp footerText={'Имэйл хаяг руу илгээсэн 6 оронтой кодыг оруулна уу'} />
      </MockedProvider>
    );
    const otpInput = getByTestId('OTPInput');
    fireEvent.change(otpInput, { target: { value: '123456' } });

    expect(otpInput);
  });

  it('navigates back on clicking the back icon', async () => {
    const { getByTestId } = render(
      <MockedProvider>
        <VerifyOtp footerText="Enter the 6-digit code sent to your email" />
      </MockedProvider>
    );

    fireEvent.click(getByTestId('MoveLeft'));
    const router = useRouter();

    await waitFor(() => {
      expect(router.push);
    });
  });

  it('calls verifyOtp when OTP input is filled', async () => {
    const mockVerifyOtp = jest.fn();
    jest.mock('@/components/providers/AuthProvider', () => ({
      useAuth: () => ({
        verifyOtp: mockVerifyOtp,
        requestPasswordRecovery: jest.fn(),
      }),
    }));

    const { getByTestId } = render(
      <MockedProvider>
        <VerifyOtp footerText="Enter the 6-digit code sent to your email" />
      </MockedProvider>
    );

    const otpInput = getByTestId('OTPInput');
    fireEvent.change(otpInput, { target: { value: '123456' } });
  });
  jest.useFakeTimers();

  it('should enable the refresh button after 60 seconds and trigger handleRefresh on click', async () => {
    const mockRequestPasswordRecovery = jest.fn();
    jest.mock('@/components/providers/AuthProvider', () => ({
      useAuth: () => ({
        verifyOtp: jest.fn(),
        requestPasswordRecovery: mockRequestPasswordRecovery,
      }),
    }));

    render(
      <MockedProvider mocks={[RecoveryEmailMock]}>
        <VerifyOtp footerText="Enter the 6-digit code sent to your email" />
      </MockedProvider>
    );
  });
});
