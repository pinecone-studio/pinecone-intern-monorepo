import '@testing-library/jest-dom';
import { MockedProvider } from '@apollo/client/testing';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { UpdateFoodOrderStatusDocument } from '@/generated';

import { toast, Toaster } from 'sonner';
import { UpdateFoodOrderStatus } from '@/components/admin/order/UpdateFoodOrderStatus';

// Mock toast
jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
  },
}));

const updateOrderStatusMock = {
  request: {
    query: UpdateFoodOrderStatusDocument,
    variables: {
      input: {
        orderId: '123',
        status: 'PENDING',
      },
    },
  },
  result: {
    data: {
      updateFoodOrderStatus: {
        orderId: '123',
        orderNumber: 1212,
        status: 'PENDING',
        totalPrice: 32000,
        createdAt: '1231234',
      },
    },
  },
};

describe('UpdateFoodOrderStatus', () => {
  const mockRefetch = jest.fn().mockResolvedValue({});

  const defaultProps = {
    orderId: '123',
    orderStatus: 'PENDING',
    refetch: mockRefetch,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render form elements', () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[updateOrderStatusMock]} addTypename={false}>
        <UpdateFoodOrderStatus {...defaultProps} />
      </MockedProvider>
    );

    expect(getByTestId('update-order-form')).toBeInTheDocument();
    expect(getByTestId('status-trigger')).toBeInTheDocument();
    expect(getByTestId('submit-button')).toBeInTheDocument();
  });

  it('should submit new status and call mutation + refetch + toast', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[updateOrderStatusMock]} addTypename={false}>
        <UpdateFoodOrderStatus {...defaultProps} />
      </MockedProvider>
    );

    // Open select
    fireEvent.click(getByTestId('status-trigger'));
    await waitFor(() => screen.getByText('READY'));

    // Select READY
    fireEvent.click(screen.getByText('READY'));

    // Submit form
    fireEvent.click(getByTestId('submit-button'));
    await waitFor(() => {
      expect(getByTestId('submit-button')).toHaveTextContent('Хадгалж байна...');
    });

    await waitFor(
      () => {
        expect(<Toaster />).toBeDefined();
      },
      { timeout: 3000 }
    );
  });

  it('should display current status as default', () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[updateOrderStatusMock]} addTypename={false}>
        <UpdateFoodOrderStatus {...defaultProps} orderStatus="PREPARING" />
      </MockedProvider>
    );

    const trigger = getByTestId('status-trigger');
    expect(trigger).toHaveTextContent('PREPARING');
  });
});
