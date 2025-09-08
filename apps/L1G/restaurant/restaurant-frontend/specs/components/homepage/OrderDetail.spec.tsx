/* eslint max-lines: "off" */
import '@testing-library/jest-dom';
import { GetFoodOrdersByUserDocument } from '@/generated';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import OrderDetail from '@/components/home/OrderDetail';
import { render, waitFor } from '@testing-library/react';

jest.mock('jsonwebtoken', () => ({
  decode: jest.fn(),
}));

import { decode } from 'jsonwebtoken';
const mockDecode = decode as jest.MockedFunction<typeof decode>;

const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

beforeAll(() => {
  Object.defineProperty(window, 'localStorage', {
    value: mockLocalStorage,
    writable: true,
  });
});

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => {
    return <img src={src} alt={alt} {...props} />;
  },
}));

const getFoodOrderByUserIdMock: MockedResponse = {
  request: {
    query: GetFoodOrdersByUserDocument,
    variables: {
      input: {
        userId: '1',
      },
    },
  },
  result: {
    data: {
      getFoodOrdersByUser: [
        {
          orderId: '1',
          orderNumber: 90400,
          status: 'PENDING',
          totalPrice: 34000,
          orderType: 'IN',
          createdAt: '1756953474097',
          updatedAt: '1756953474097',
          user: {
            userId: '1',
            username: 'Test',
            bonusPoints: 0,
          },
          table: {
            tableId: '2',
            tableName: '2b',
          },
          foodOrder: [
            {
              food: {
                foodId: '1',
                foodName: 'Grilled Squash Taco',
                image: 'image.png',
                price: '25500',
              },
              quantity: 1,
            },
            {
              food: {
                foodId: '2',
                foodName: 'Green tea',
                image: 'image.png',
                price: '27800',
              },
              quantity: 1,
            },
          ],
        },
        {
          orderId: '2',
          orderNumber: 90500,
          status: 'PENDING',
          totalPrice: 35000,
          orderType: 'IN',
          createdAt: '1756972230716',
          updatedAt: '1756975437542',
          user: {
            userId: '1',
            username: 'Test',
            bonusPoints: 0,
          },
          table: {
            tableId: '2',
            tableName: '2b',
          },
          foodOrder: [
            {
              food: {
                foodId: '1',
                foodName: 'Grilled Squash Taco',
                image: 'image.png',
                price: '25500',
              },
              quantity: 1,
            },
            {
              food: {
                foodId: '2',
                foodName: 'Green tea',
                image: 'image.png',
                price: '27800',
              },
              quantity: 1,
            },
          ],
        },
      ],
    },
  },
};

const getFoodOrderByUserIdWithShortPrice: MockedResponse = {
  request: {
    query: GetFoodOrdersByUserDocument,
    variables: {
      input: {
        userId: '1',
      },
    },
  },
  result: {
    data: {
      getFoodOrdersByUser: [
        {
          orderId: '3',
          orderNumber: 90442,
          status: 'PENDING',
          totalPrice: 34000,
          orderType: 'IN',
          createdAt: '1756953474097',
          updatedAt: '1756953474097',
          user: {
            userId: '1',
            username: 'Test',
            bonusPoints: 0,
          },
          table: {
            tableId: '2',
            tableName: '2b',
          },
          foodOrder: [
            {
              food: {
                foodId: '1',
                foodName: 'Grilled Squash Taco',
                image: 'image.png',
                price: '300',
              },
              quantity: 1,
            },
          ],
        },
      ],
    },
  },
};

describe('OrderDetail', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render with valid token and data', async () => {
    mockLocalStorage.getItem.mockReturnValue('mocked.jwt.token');
    mockDecode.mockReturnValue({
      user: {
        _id: '1',
      },
    });

    const { getByTestId, getByText } = render(
      <MockedProvider mocks={[getFoodOrderByUserIdMock]}>
        <OrderDetail />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(getByTestId('order-detail-card')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(getByTestId('order-details-last')).toBeInTheDocument();
    });

    expect(getByText('#90500')).toBeInTheDocument();
    expect(getByText('PENDING')).toBeInTheDocument();
    expect(getByText('Grilled Squash Taco')).toBeInTheDocument();
    expect(getByText('Green tea')).toBeInTheDocument();
  });

  it('should render with short price format', async () => {
    mockLocalStorage.getItem.mockReturnValue('mocked.jwt.token');
    mockDecode.mockReturnValue({
      user: {
        _id: '1',
      },
    });

    const { findByText } = render(
      <MockedProvider mocks={[getFoodOrderByUserIdWithShortPrice]}>
        <OrderDetail />
      </MockedProvider>
    );

    const shortPrice = await findByText('300');
    expect(shortPrice).toBeInTheDocument();
  });

  it('should show login message when token is not found', () => {
    mockLocalStorage.getItem.mockReturnValue(null);

    const { getByText } = render(
      <MockedProvider mocks={[]}>
        <OrderDetail />
      </MockedProvider>
    );

    expect(getByText('Захиалгын мэдээлэл үзэхийн тулд нэвтэрнэ үү')).toBeInTheDocument();

    expect(mockLocalStorage.getItem).toHaveBeenCalledWith('token');

    expect(mockDecode).not.toHaveBeenCalled();
  });

  it('should show user info not found message when decoded token has no user._id', () => {
    mockLocalStorage.getItem.mockReturnValue('incomplete.jwt.token');
    mockDecode.mockReturnValue({
      user: {},
    });

    const { getByText } = render(
      <MockedProvider mocks={[]}>
        <OrderDetail />
      </MockedProvider>
    );

    expect(getByText('Захиалгын мэдээлэл үзэхийн тулд нэвтэрнэ үү')).toBeInTheDocument();

    expect(mockLocalStorage.getItem).toHaveBeenCalledWith('token');

    expect(mockDecode).toHaveBeenCalledWith('incomplete.jwt.token');
  });
});
