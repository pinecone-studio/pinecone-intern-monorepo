import { RecoveryEmail } from '@/components';
import { RequestPasswordRecoveryDocument } from '@/generated';
import { MockedProvider } from '@apollo/client/testing';
import { render } from '@testing-library/react';

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

jest.mock('@/components/providers/AuthProvider', () => ({
  ...jest.requireActual('@/components/providers/AuthProvider'),
  useAuth: () => ({
    requestPasswordRecovery: jest.fn(),
    loading: false,
  }),
}));
describe('RecoveryEmail', () => {
  it('should render successfully', async () => {
    const header = 'Reset your password';
    const buttonText = 'Хүсэлт илгээх';
    const emailLabel = 'Email Address';
    render(
      <MockedProvider mocks={[RecoveryEmailMock]}>
        <RecoveryEmail header={header} buttonText={buttonText} emailLabel={emailLabel} />
      </MockedProvider>
    );
  });
});
