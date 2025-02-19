import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { GetOrdersForUserDocument } from '@/generated';
import NotificationSection from '@/components/NotificationSection';

jest.mock('sonner', () => ({
  toast: {
    error: jest.fn(),
  },
}));

const mocks = [
  {
    request: {
      query: GetOrdersForUserDocument,
      variables: { userId: '123' },
    },
    result: {
      data: {
        getOrdersForUser: [
          {
            _id: 'order1',
            status: 'Pending',
            createdAt: '2025-02-18T12:00:00Z',
          },
          {
            _id: 'order2',
            status: 'InProcess',
            createdAt: '2025-02-18T11:00:00Z',
          },
        ],
      },
    },
  },
];

describe('NotificationSection', () => {
  beforeEach(() => {
    localStorage.setItem('user', JSON.stringify({ _id: '123' }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('shows error toast if there is an issue with user data', () => {
    localStorage.setItem('user', 'invalid-user');

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <NotificationSection />
      </MockedProvider>
    );
  });
});
