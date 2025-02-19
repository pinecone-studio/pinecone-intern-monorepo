import Wallet from '@/components/order/Wallet';
import { GetOrdersForUserDocument } from '@/generated';
import { MockedProvider } from '@apollo/client/testing';
import { render } from '@testing-library/react';
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
describe('wallet rendering', () => {
  it('wallet renders successfully', () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Wallet />
      </MockedProvider>
    );
  });
});
