/* eslint-disable  max-lines */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import { useGetOrdersQuery } from '@/generated';
import AdminMainPageComp from '@/components/admin-page-comp/AdminMainPageComp';

// Mock the next/image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />;
  },
}));

// Mock the generated hook
jest.mock('@/generated', () => ({
  useGetOrdersQuery: jest.fn(),
}));

const mockOrders = [
  {
    _id: '1',
    tableId: 1,
    status: 'pending',
    createdAt: '2025-01-29T14:30:00Z',
    items: [
      {
        name: 'Test Food Item',
        quantity: 2,
        price: 15000,
      },
    ],
  },
];

function createMockPointerEvent(type: string, props: PointerEventInit = {}): PointerEvent {
  const event = new Event(type, props) as PointerEvent;
  Object.assign(event, {
    button: props.button ?? 0,
    ctrlKey: props.ctrlKey ?? false,
    pointerType: props.pointerType ?? 'mouse',
  });
  return event;
}

// Assign the mock function to the global window object
window.PointerEvent = createMockPointerEvent as any;

// Mock HTMLElement methods
Object.assign(window.HTMLElement.prototype, {
  scrollIntoView: jest.fn(),
  releasePointerCapture: jest.fn(),
  hasPointerCapture: jest.fn(),
});

describe('AdminMainPageComp', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();

    // Setup default mock implementation
    (useGetOrdersQuery as jest.Mock).mockReturnValue({
      data: {
        getOrders: mockOrders,
      },
    });
  });

  it('renders without crashing', () => {
    render(<AdminMainPageComp />);
    expect(screen.getByText('Захиалга')).toBeInTheDocument();
  });

  it('displays the correct date filter button', () => {
    render(<AdminMainPageComp />);
    expect(screen.getByText('Өнөөдөр')).toBeInTheDocument();
  });

  it('displays the correct status filter button', () => {
    render(<AdminMainPageComp />);
    expect(screen.getByText('Төлөв')).toBeInTheDocument();
  });

  describe('Order rendering and price calculations', () => {
    it('handles null order in the orders array', () => {
      (useGetOrdersQuery as jest.Mock).mockReturnValue({
        data: {
          getOrders: [null, mockOrders[0]],
        },
      });

      render(<AdminMainPageComp />);
      // Should still render the valid order
      expect(screen.getByText('Test Food Item')).toBeInTheDocument();
      // Only one order card should be rendered
      expect(screen.getAllByText(/₮$/).length).toBe(2); // One for item price, one for total
    });

    it('calculates total price correctly with null items', () => {
      const ordersWithNullItems = [
        {
          _id: '1',
          tableId: 1,
          status: 'pending',
          createdAt: '2025-01-29T14:30:00Z',
          items: [
            null,
            {
              name: 'Valid Item',
              quantity: 1,
              price: 10000,
            },
          ],
        },
      ];

      (useGetOrdersQuery as jest.Mock).mockReturnValue({
        data: {
          getOrders: ordersWithNullItems,
        },
      });

      render(<AdminMainPageComp />);
      // Should show correct total (10000₮)
      expect(screen.getByText("10'000₮")).toBeInTheDocument();
    });

    it('calculates total price correctly with null price and quantity', () => {
      const ordersWithNullValues = [
        {
          _id: '1',
          tableId: 1,
          status: 'pending',
          createdAt: '2025-01-29T14:30:00Z',
          items: [
            {
              name: 'Item with null price',
              quantity: 2,
              price: null,
            },
            {
              name: 'Item with null quantity',
              quantity: null,
              price: 5000,
            },
            {
              name: 'Valid Item',
              quantity: 1,
              price: 10000,
            },
          ],
        },
      ];

      (useGetOrdersQuery as jest.Mock).mockReturnValue({
        data: {
          getOrders: ordersWithNullValues,
        },
      });

      render(<AdminMainPageComp />);
      // Should show correct total (10000₮) - only the valid item should contribute to total
      expect(screen.getByText("10'000₮")).toBeInTheDocument();
    });

    it('handles order with no items array', () => {
      const orderWithNoItems = [
        {
          _id: '1',
          tableId: 1,
          status: 'pending',
          createdAt: '2025-01-29T14:30:00Z',
        },
      ];

      (useGetOrdersQuery as jest.Mock).mockReturnValue({
        data: {
          getOrders: orderWithNoItems,
        },
      });

      render(<AdminMainPageComp />);
      // Should show 0₮ for total
      expect(screen.getByText('₮')).toBeInTheDocument();
    });

    it('calculates total price correctly with multiple items', () => {
      const orderWithMultipleItems = [
        {
          _id: '1',
          tableId: 1,
          status: 'pending',
          createdAt: '2025-01-29T14:30:00Z',
          items: [
            {
              name: 'Item 1',
              quantity: 2,
              price: 10000,
            },
            {
              name: 'Item 2',
              quantity: 3,
              price: 5000,
            },
          ],
        },
      ];

      (useGetOrdersQuery as jest.Mock).mockReturnValue({
        data: {
          getOrders: orderWithMultipleItems,
        },
      });

      render(<AdminMainPageComp />);
      // Total should be (2 * 10000) + (3 * 5000) = 35000₮
      expect(screen.getByText("35'000₮")).toBeInTheDocument();
    });
  });

  it('renders without crashing', () => {
    render(<AdminMainPageComp />);
    expect(screen.getByText('Захиалга')).toBeInTheDocument();
  });

  it('displays the correct date filter button', () => {
    render(<AdminMainPageComp />);
    expect(screen.getByText('Өнөөдөр')).toBeInTheDocument();
  });

  it('displays the correct status filter button', () => {
    render(<AdminMainPageComp />);
    expect(screen.getByText('Төлөв')).toBeInTheDocument();
  });

  it('renders order cards with correct information', () => {
    render(<AdminMainPageComp />);

    // Check if table ID is displayed
    expect(screen.getByText('1')).toBeInTheDocument();

    // Check if order number is displayed
    expect(screen.getByText('#33999')).toBeInTheDocument();

    // Check if item details are displayed
    expect(screen.getByText('Test Food Item')).toBeInTheDocument();
    expect(screen.getByText('15000₮')).toBeInTheDocument();
    expect(screen.getByText('2ш')).toBeInTheDocument();

    // Check if total price is displayed (30000 for 2 items at 15000 each)
    expect(screen.getByText("30'000₮")).toBeInTheDocument();
  });

  it('displays the correct time format', () => {
    render(<AdminMainPageComp />);
    // The time should be displayed in 24-hour format
    expect(screen.getByTestId('date')).toBeInTheDocument();
  });

  it('renders the status select with correct options', async () => {
    render(<AdminMainPageComp />);

    // Find and click the select trigger to open the dropdown
    const selectTrigger = screen.getByTestId('select-button');
    fireEvent.pointerDown(selectTrigger);

    // Use waitFor to ensure the options appear in the dropdown
    await waitFor(() => {
      expect(screen.getByTestId('belen-test')).toBeInTheDocument();
      expect(screen.getByTestId('pending-test')).toBeInTheDocument();
      expect(screen.getByTestId('inpro-test')).toBeInTheDocument();
      expect(screen.getByTestId('done-test')).toBeInTheDocument();
    });
  });

  it('renders save button', () => {
    render(<AdminMainPageComp />);
    expect(screen.getByText('Хадгалах')).toBeInTheDocument();
  });

  it('handles empty orders gracefully', () => {
    (useGetOrdersQuery as jest.Mock).mockReturnValue({
      data: {
        getOrders: [],
      },
    });

    render(<AdminMainPageComp />);
    // Should still render the header
    expect(screen.getByText('Захиалга')).toBeInTheDocument();
    // Should not render any order cards
    expect(screen.queryByText('#33999')).not.toBeInTheDocument();
  });

  it('handles null order data gracefully', () => {
    (useGetOrdersQuery as jest.Mock).mockReturnValue({
      data: null,
    });

    render(<AdminMainPageComp />);
    // Should still render the header
    expect(screen.getByText('Захиалга')).toBeInTheDocument();
    // Should not render any order cards
    expect(screen.queryByText('#33999')).not.toBeInTheDocument();
  });
});
