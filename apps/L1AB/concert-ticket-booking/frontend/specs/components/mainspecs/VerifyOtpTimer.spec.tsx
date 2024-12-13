import { render, screen, fireEvent } from '@testing-library/react';
import Timer from '@/components/maincomponents/VerifyOtpTimer';
import { RequestPasswordRecoveryDocument } from '@/generated';
import { MockedProvider } from '@apollo/client/testing';

jest.mock('@/components/providers/AuthProvider', () => ({
  useAuth: () => ({
    requestPasswordRecovery: jest.fn(),
  }),
}));
jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(() => ({
    get: jest.fn((key) => {
      if (key === 'email') return 'test@example.com';
      if (key === 'token') return 'dummy-token';
      return null;
    }),
  })),
}));

const recoveryEmailMock = {
  request: {
    query: RequestPasswordRecoveryDocument,
    variables: {
      input: {
        email: 'test@example.com',
      },
    },
  },
  result: {
    data: {
      requestPasswordRecovery: {
        id: '1',
        email: 'test@example.com',
      },
    },
  },
};

describe('Timer Component', () => {
  let mockRequestPasswordRecovery: jest.Mock;

  beforeEach(() => {
    mockRequestPasswordRecovery = jest.fn();
    jest.mock('@/components/providers/AuthProvider', () => ({
      useAuth: () => ({
        requestPasswordRecovery: mockRequestPasswordRecovery,
      }),
    }));
  });

  it('should call requestPasswordRecovery when resendButton is clicked', async () => {
    render(
      <MockedProvider mocks={[recoveryEmailMock]}>
        <Timer initialCounter={0} />
      </MockedProvider>
    );

    const resendButton = screen.getByTestId('resend-otp-button');
    fireEvent.click(resendButton);

    expect(mockRequestPasswordRecovery);
  });

  it('should display timer when counter is greater than 0', async () => {
    render(<Timer initialCounter={30} />);
    expect(screen.getByText('30 секунд хүлээнэ үү.'));
  });

  it('should show the refresh button and OTP message after the timer reaches 0', async () => {
    render(
      <MockedProvider mocks={[recoveryEmailMock]}>
        <Timer initialCounter={0} />
      </MockedProvider>
    );

    expect(screen.getByTestId('resend-otp-text'));
    expect(screen.getByText('OTP дахин илгээх.'));
  });
});
