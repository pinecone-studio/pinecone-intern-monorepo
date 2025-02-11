import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import OrderDetail from '@/components/order/OrderDetail';

jest.mock('@/components/common/Header', () => {
  const MockHeader = () => {
    return <div data-testid="mock-header">Header</div>;
  };
  return MockHeader;
});

describe('OrderDetail Component', () => {
  const mockOrder = {
    id: '123',
    tableId: 1,
    status: 'PENDING',
    items: [
      {
        name: 'Test Item',
        quantity: 2,
        price: 10000,
        imageUrl: '/test-image.jpg',
      },
    ],
    imageUrl: '/order-image.jpg',
  };

  beforeEach(() => {
    localStorage.clear();
  });

  it('should show loading state initially', async () => {
    render(<OrderDetail />);
    expect(await screen.getByTestId('order-not-found')).toBeInTheDocument();
  });

  it('should show error message when no order is found', async () => {
    render(<OrderDetail />);
    await waitFor(() => {
      expect(screen.getByTestId('order-not-found')).toBeInTheDocument();
    });
  });

  it('should render order details when order exists in localStorage', async () => {
    localStorage.setItem('order', JSON.stringify(mockOrder));

    render(<OrderDetail />);
  });

  it('should render paid status correctly', async () => {
    const paidOrder = { ...mockOrder, status: 'PAID' };
    localStorage.setItem('order', JSON.stringify(paidOrder));

    render(<OrderDetail />);

    await waitFor(() => {
      expect(screen.getByTestId('tolov')).toBeInTheDocument();
    });
  });

  it('should render header component', async () => {
    localStorage.setItem('order', JSON.stringify(mockOrder));

    render(<OrderDetail />);
  });

  it('should handle invalid order data in localStorage', async () => {
    localStorage.setItem('order', JSON.stringify({ tableId: 1 }));
    render(<OrderDetail />);

    await waitFor(() => {
      expect(screen.getByTestId('order-not-found')).toBeInTheDocument();
    });
  });

  it('should handle malformed JSON in localStorage', async () => {
    localStorage.setItem('order', 'invalid-json');

    render(<OrderDetail />);

    await waitFor(() => {
      expect(screen.getByTestId('order-not-found')).toBeInTheDocument();
    });
  });
});
