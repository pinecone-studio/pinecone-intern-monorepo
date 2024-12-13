import { RecoveryEmail } from '@/components';
import { RequestPasswordRecoveryDocument } from '@/generated';
import { MockedProvider } from '@apollo/client/testing';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { useTheme } from 'next-themes';

const RecoveryEmailMock = {
  request: {
    query: RequestPasswordRecoveryDocument,
    variables: {
      input: {
        email: 'test@gmail.com',
      },
    },
  },
  result: {
    data: {
      requestPasswordRecovery: {
        id: '1',
        email: 'test@gmail.com',
      },
    },
  },
};
jest.mock('next-themes', () => ({
  useTheme: jest.fn(),
  theme: 'light',
}));
jest.mock('@/components/providers/AuthProvider', () => ({
  ...jest.requireActual('@/components/providers/AuthProvider'),
  useAuth: () => ({
    requestPasswordRecovery: jest.fn(),
    loading: true,
  }),
}));
beforeEach(() => {
  (useTheme as jest.Mock).mockImplementation(() => ({
    theme: 'dark',
  }));
});
describe('RecoveryEmail', () => {
  it('should render successfully', async () => {
    const header = 'Reset your password';
    const buttonText = 'Хүсэлт илгээх';
    const emailLabel = 'Email Address';
    const { getByTestId, getByPlaceholderText } = render(
      <MockedProvider mocks={[RecoveryEmailMock]}>
        <RecoveryEmail header={header} buttonText={buttonText} emailLabel={emailLabel} />
      </MockedProvider>
    );
    const emailCheck = getByPlaceholderText('name@example.com');
    fireEvent.change(emailCheck, { target: { value: 'test@gmail.com' } });
    await waitFor(() => fireEvent.click(getByTestId('send-otp-request-button')));
    fireEvent.click(getByTestId('send-otp-request-button'));

    await waitFor(() => {
      expect(getByTestId('send-otp-request-button'));
    });

    await waitFor(() => {
      expect(getByTestId('send-otp-request-button'));
    });
  });

  it('displays loading text while loading', async () => {
    const header = 'Reset your password';
    const buttonText = 'Хүсэлт илгээх';
    const emailLabel = 'Email Address';

    const { getByTestId, getByText } = render(<RecoveryEmail header={header} buttonText={buttonText} emailLabel={emailLabel} />);

    fireEvent.click(getByTestId('send-otp-request-button'));

    await waitFor(() => {
      expect(getByText('Илгээж байна...'));
    });
  });
});
