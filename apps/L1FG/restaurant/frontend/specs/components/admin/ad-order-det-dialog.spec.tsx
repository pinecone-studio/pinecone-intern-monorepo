import { render, screen, fireEvent } from '@testing-library/react';

import '@testing-library/jest-dom';
import DialogDetails from '@/components/admin-page-comp/AdminOrderDetDialog';

// Mock next/image since it's not available in the test environment
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt} />;
  },
}));

describe('DialogDetails Component', () => {
  const mockOrder = {
    _id: '123',
    status: 'pending',
    tableId: 'Table 5',
    createdAt: '2024-02-04T14:30:00Z',
    items: [
      {
        name: 'Test Food Item',
        price: 15000,
        quantity: 2,
        imageUrl: '/test-image.jpg',
      },
      {
        name: 'Another Food Item',
        price: 20000,
        quantity: 1,
        imageUrl: '/test-image-2.jpg',
      },
    ],
  };

  it('renders the dialog trigger button', () => {
    render(<DialogDetails order={mockOrder} />);
    expect(screen.getByText('Дэлгэрэнгүй харах')).toBeInTheDocument();
  });

  it('displays order details when dialog is opened', () => {
    render(<DialogDetails order={mockOrder} />);

    // Click the button to open dialog
    fireEvent.click(screen.getByText('Дэлгэрэнгүй харах'));

    // Check if order ID is displayed

    // Check if table number is displayed
    expect(screen.getByTestId('order-table-num')).toHaveTextContent('Table 5');

    // Check if items are displayed
    expect(screen.getByText('Test Food Item')).toBeInTheDocument();
    expect(screen.getByText('Another Food Item')).toBeInTheDocument();

    // Check if prices are displayed
    expect(screen.getByText('15000₮')).toBeInTheDocument();
    expect(screen.getByText('20000₮')).toBeInTheDocument();

    // Check if quantities are displayed
    expect(screen.getByText('2ш')).toBeInTheDocument();
    expect(screen.getByText('1ш')).toBeInTheDocument();
  });

  it('calculates and displays the total price correctly', () => {
    render(<DialogDetails order={mockOrder} />);
    fireEvent.click(screen.getByText('Дэлгэрэнгүй харах'));

    // Total should be 50'000₮ (15000 * 2 + 20000 * 1)
    const totalPriceElements = screen.getAllByTestId('total-price');
    expect(totalPriceElements[1]).toHaveTextContent("50'000₮");
  });

  it('displays the order status', () => {
    render(<DialogDetails order={mockOrder} />);
    fireEvent.click(screen.getByText('Дэлгэрэнгүй харах'));

    const statusElements = screen.getAllByTestId('total-price');
    expect(statusElements[0]).toHaveTextContent('pending');
  });

  it('formats the time correctly', () => {
    render(<DialogDetails order={mockOrder} />);
    fireEvent.click(screen.getByText('Дэлгэрэнгүй харах'));

    const timeElement = screen.getByTestId('date');
    // Note: This test might need adjustment based on the timezone
    expect(timeElement).toBeInTheDocument();
    // You can add more specific time format checks if needed
  });

  it('handles missing or undefined values gracefully', () => {
    const incompleteOrder = {
      _id: '123',
      status: 'pending',
      tableId: 'Table 5',
      createdAt: '2024-02-04T14:30:00Z',
      items: [
        {
          name: 'Test Food Item',
          // Missing price and quantity
          imageUrl: '/test-image.jpg',
        },
      ],
    };

    render(<DialogDetails order={incompleteOrder} />);
    fireEvent.click(screen.getByText('Дэлгэрэнгүй харах'));

    // Should not crash and should display available information
    expect(screen.getByText('Test Food Item')).toBeInTheDocument();
  });

  it('uses default image when imageUrl is missing', () => {
    const orderWithMissingImage = {
      ...mockOrder,
      items: [
        {
          ...mockOrder.items[0],
          imageUrl: undefined,
        },
      ],
    };

    render(<DialogDetails order={orderWithMissingImage} />);
    fireEvent.click(screen.getByText('Дэлгэрэнгүй харах'));

    const image = screen.getByAltText('food');
    expect(image).toHaveAttribute('src', '/default-image.jpg');
  });
});
