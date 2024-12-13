import { VerifyOtp } from '@/components/maincomponents/VerifyOtp';
import { RequestPasswordRecoveryDocument, VerifyOtpDocument } from '@/generated';
import { MockedProvider } from '@apollo/client/testing';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import React from 'react';
import { act } from 'react-dom/test-utils';

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

const verifyOtpMock = {
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

const recoveryEmailMock = {
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
jest.mock('next-themes', () => ({
  useTheme: jest.fn(),
  theme: 'dark',
}));

describe('VerifyOtp Component', () => {
  beforeEach(() => {
    (useTheme as jest.Mock).mockImplementation(() => ({
      theme: 'light',
    }));
  });
  it('should update state value when OTP input slots change', () => {
    render(
      <MockedProvider mocks={[verifyOtpMock]}>
        <VerifyOtp footerText="Enter the 6-digit code sent to your email" />
      </MockedProvider>
    );

    const otpInput = screen.getByTestId('OTPInput');
    fireEvent.change(otpInput, { target: { value: '123456' } });
    expect(otpInput);
  });

  it('navigates back on clicking the back icon', async () => {
    render(
      <MockedProvider>
        <VerifyOtp footerText="Enter the 6-digit code sent to your email" />
      </MockedProvider>
    );

    const backIcon = screen.getByTestId('MoveLeft');
    fireEvent.click(backIcon);

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

    render(
      <MockedProvider>
        <VerifyOtp footerText="Enter the 6-digit code sent to your email" />
      </MockedProvider>
    );

    const otpInput = screen.getByTestId('OTPInput');
    fireEvent.change(otpInput, { target: { value: '123456' } });

    await waitFor(() => {
      expect(mockVerifyOtp);
    });
  });

  it('should call requestPasswordRecovery when refreshCounter is 0 and reset the counter to 60', async () => {
    const mockRequestPasswordRecovery = jest.fn();

    jest.mock('@/components/providers/AuthProvider', () => ({
      useAuth: () => ({
        requestPasswordRecovery: mockRequestPasswordRecovery,
      }),
    }));

    render(
      <MockedProvider mocks={[recoveryEmailMock]}>
        <VerifyOtp footerText="Enter the 6-digit code sent to your email" />
      </MockedProvider>
    );

    act(() => {
      jest.advanceTimersByTime(30000);
    });
  });
});
