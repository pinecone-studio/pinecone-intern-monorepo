import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import OrdersHistory from 'src/components/History';

import { GetFoodOrdersByUserDocument } from '@/generated';

const USER_ID = '68b03cf9a1b630c331183254';

const mocksWithData = [
  {
    request: {
      query: GetFoodOrdersByUserDocument, // ✅ hook.document биш
      variables: { input: { userId: USER_ID } },
    },
    result: {
      data: {
        getFoodOrdersByUser: [
          { orderId: '1', orderNumber: '1001', status: 'PENDING', totalPrice: 5000 },
          { orderId: '2', orderNumber: '1002', status: 'DELIVERED', totalPrice: 7500 },
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
    result: { data: { getFoodOrdersByUser: [] } },
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
  it('renders loading state initially', () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <OrdersHistory />
      </MockedProvider>
    );

    expect(screen.getByText('Уншиж байна...')).toBeInTheDocument();
  });

  it('renders order data correctly', async () => {
    render(
      <MockedProvider mocks={mocksWithData} addTypename={false}>
        <OrdersHistory />
      </MockedProvider>
    );

    expect(await screen.findByText('#1001')).toBeInTheDocument();
    expect(await screen.findByText('#1002')).toBeInTheDocument();
    expect(screen.getByText('PENDING')).toBeInTheDocument();
    expect(screen.getByText('DELIVERED')).toBeInTheDocument();
    expect(screen.getByText('5000₮')).toBeInTheDocument();
    expect(screen.getByText('7500₮')).toBeInTheDocument();
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
});
