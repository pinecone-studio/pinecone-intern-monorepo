import { GetFoodOrdersDocument, GetTablesDocument } from '@/generated';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { render, waitFor } from '@testing-library/react';
import { ErrorBoundary } from 'specs/utils/ErrorBoundary';
import '@testing-library/jest-dom';
import { OrderContainer } from '@/components/admin/order/OrderContainer';

const getFoodOrdersMock: MockedResponse = {
  request: {
    query: GetFoodOrdersDocument,
  },
  result: {
    data: {
      getFoodOrders: [
        {
          orderId: '68b82b0176beab33f81bed0f',
          orderNumber: 14988,
          orderType: 'GO',
          status: 'READY',
          totalPrice: 300000,
          createdAt: '1756900097027',
          table: {
            tableName: '1b',
          },
          foodOrder: [
            {
              food: {
                foodName: 'Tuna Tostada',
                price: '21000',
                image: 'https://res.cloudinary.com/dfdpirnv5/image/upload/v1756618783/l0aoe9nvtcbxnnrsllh0.webp',
              },
              quantity: 2,
            },
            {
              food: {
                foodName: 'Sweet Donut',
                price: '4500',
                image: 'https://res.cloudinary.com/dfdpirnv5/image/upload/v1756619254/qcme5nh2mphsqctjkj2y.jpg',
              },
              quantity: 2,
            },
          ],
        },
      ],
    },
  },
};

const getFoodOrderEmptyMock: MockedResponse = {
  request: {
    query: GetFoodOrdersDocument,
  },
  result: {
    data: {
      getFoodOrders: [],
    },
  },
};

const getFoodOrdersErrorMock: MockedResponse = {
  request: {
    query: GetFoodOrdersDocument,
  },
  error: new Error('Network error'),
};

describe('OrderContainer Component', () => {
  it('should render OrderContainer', async () => {
    const { getAllByTestId } = render(
      <MockedProvider mocks={[getFoodOrdersMock]} addTypename={false}>
        <OrderContainer />
      </MockedProvider>
    );
    await waitFor(() => {
      const orders = getAllByTestId('admin-order');
      expect(orders).toBeDefined();
    });
  });

  it('should display empty message when no orders', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[getFoodOrderEmptyMock]} addTypename={false}>
        <OrderContainer />
      </MockedProvider>
    );
    await waitFor(() => {
      expect(getByTestId('admin-empty-message')).toBeDefined();
    });
  });

  it('should show error boundary on query error', async () => {
    const { getByTestId } = render(
      <ErrorBoundary fallback={<div data-testid="error">Error</div>}>
        <MockedProvider mocks={[getFoodOrdersErrorMock]} addTypename={false}>
          <OrderContainer />
        </MockedProvider>
      </ErrorBoundary>
    );

    await waitFor(() => {
      expect(getByTestId('error')).toBeDefined();
    });
  });
});
