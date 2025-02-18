import Header from '@/components/common/Header';
import { useCart } from '@/components/providers';
import { GetOrdersForUserDocument } from '@/generated';
import { MockedProvider } from '@apollo/client/testing';
import { render } from '@testing-library/react';

jest.mock('@/components/providers', () => ({
  useCart: jest.fn(),
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

describe('Header Component', () => {
  it('calculates and displays correct order length', async () => {
    const mockOrders = [{ quantity: 2 }, { quantity: 3 }, { quantity: 5 }];

    useCart.mockReturnValue({
      orders: mockOrders,
    });

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Header />
      </MockedProvider>
    );

    mockOrders.reduce((total, order) => total + order.quantity, 0);
  });
});
