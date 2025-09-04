import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import OrdersHistory from '@/components/OrderHistory';
import { GetFoodOrdersByUserDocument } from '@/generated';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock jsonwebtoken
jest.mock('jsonwebtoken', () => ({
  decode: jest.fn(),
}));

// Mock Navbar component
jest.mock('@/components/sheets/Navbar', () => ({
  Navbar: () => <div data-testid="navbar">Navbar</div>,
}));

import { decode } from 'jsonwebtoken';
import { Navbar } from '@/components/sheets/Navbar';

const USER_ID = '68b03cf9a1b630c331183254';

const mockUser = {
  user: {
    _id: USER_ID,
    name: 'Test User',
    email: 'test@example.com',
  },
};

const mockToken = 'mock-jwt-token';

const mocksWithData = [
  {
    request: {
      query: GetFoodOrdersByUserDocument,
      variables: { input: { userId: USER_ID } },
    },
    result: {
      data: {
        getFoodOrdersByUser: [
          {
            orderId: '1',
            orderNumber: '1001',
            status: 'PENDING',
            totalPrice: 5000,
            createdAt: '1756972230716',
            __typename: 'FoodOrder',
          },
        ],
      },
    },
  },
];

const mocksEmptyData = [
  {
    request: {
      query: GetFoodOrdersByUserDocument,
      variables: { input: { userId: USER_ID } },
    },
    result: {
      data: {
        getFoodOrdersByUser: [],
      },
    },
  },
];

const mocksWithError = [
  {
    request: {
      query: GetFoodOrdersByUserDocument,
      variables: { input: { userId: USER_ID } },
    },
    error: new Error('Network error'),
  },
];

describe('OrdersHistory Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Setup localStorage mock
    localStorageMock.getItem.mockReturnValue(mockToken);
    // Setup JWT decode mock
    (decode as jest.Mock).mockReturnValue(mockUser);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it('renders login message when no token is available', () => {
    // Mock no token scenario
    localStorageMock.getItem.mockReturnValue(null);

    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <OrdersHistory />
      </MockedProvider>
    );

    expect(screen.getByText('Захиалгын түүх')).toBeInTheDocument();
    expect(screen.getByText('Та нэвтрэнэ үү!')).toBeInTheDocument();
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
  });

  // Test for the ternary condition on line 36
  it('renders orders when data exists and token is present', async () => {
    render(
      <MockedProvider mocks={mocksWithData} addTypename={false}>
        <OrdersHistory />
      </MockedProvider>
    );

    // Wait for data to load
    expect(await screen.findByText('#1001')).toBeInTheDocument();
    expect(screen.getByText('PENDING')).toBeInTheDocument();
    expect(screen.getByText('5000₮')).toBeInTheDocument();
  });

  it("renders 'no orders' when data is empty", async () => {
    render(
      <MockedProvider mocks={mocksEmptyData} addTypename={false}>
        <OrdersHistory />
      </MockedProvider>
    );

    expect(await screen.findByText('Захиалгаа олдсонгүй')).toBeInTheDocument();
  });

  it('renders error state gracefully', async () => {
    render(
      <MockedProvider mocks={mocksWithError} addTypename={false}>
        <OrdersHistory />
      </MockedProvider>
    );

    expect(await screen.findByText('Network error')).toBeInTheDocument();
  });

  it('calls JWT decode with token', async () => {
    render(
      <MockedProvider mocks={mocksWithData} addTypename={false}>
        <OrdersHistory />
      </MockedProvider>
    );
    expect(decode).toHaveBeenCalledWith(mockToken);
  });

  it('should render the sheetMenu Component', () => {
    render(<Navbar />);
  });
});
