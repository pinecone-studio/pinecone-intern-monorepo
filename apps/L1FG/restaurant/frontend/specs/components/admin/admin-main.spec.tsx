/* eslint-disable */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useGetOrdersQuery } from '@/generated';
import { format } from 'date-fns';
import { mn } from 'date-fns/locale';
import AdminMainPageComp from '@/components/admin-page-comp/AdminMainPageComp';
import '@testing-library/jest-dom';
import React from 'react';
import userEvent from '@testing-library/user-event';
// Mock the generated hook
jest.mock('@/generated', () => ({
  useGetOrdersQuery: jest.fn(),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt} />;
  },
}));

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
  beforeAll(() => {
    // Setup pointer event mocks
    window.PointerEvent = createMockPointerEvent as any;

    // Mock HTMLElement methods
    Object.assign(window.HTMLElement.prototype, {
      scrollIntoView: jest.fn(),
      releasePointerCapture: jest.fn(),
      hasPointerCapture: jest.fn(),
    });
  });

  const mockOrders = [
    {
      _id: '1',
      tableId: 'Table 1',
      createdAt: new Date().toISOString(),
      items: [
        {
          name: 'Test Food',
          price: 10000,
          quantity: 2,
          imageUrl: '/test-image.jpg',
        },
      ],
    },
    {
      _id: '2',
      tableId: 'Table 2',
      createdAt: new Date().toISOString(),
      items: [
        {
          name: 'Another Food',
          price: 15000,
          quantity: 1,
          imageUrl: '/test-image-2.jpg',
        },
      ],
    },
  ];

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

  it('renders the component with orders', () => {
    render(<AdminMainPageComp />);

    // Check if the title is rendered
    expect(screen.getByText('Захиалга')).toBeInTheDocument();

    // Check if orders are rendered
    expect(screen.getByText('Table 1')).toBeInTheDocument();
    expect(screen.getByText('Test Food')).toBeInTheDocument();
  });

  it('displays correct total price for orders', () => {
    render(<AdminMainPageComp />);

    const totalPrices = screen.getAllByTestId('total-price');
    expect(totalPrices[0]).toHaveTextContent("20'000₮"); // 10000 * 2
  });

  it('displays correct time format', () => {
    render(<AdminMainPageComp />);

    const dateElements = screen.getAllByTestId('date');
    const expectedTime = new Date(mockOrders[0].createdAt).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

    expect(dateElements[0]).toHaveTextContent(expectedTime);
  });

  it('filters orders by selected date', () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const mockOrdersWithDifferentDates = [{ ...mockOrders[0] }, { ...mockOrders[1], createdAt: yesterday.toISOString() }];

    (useGetOrdersQuery as jest.Mock).mockReturnValue({
      data: {
        getOrders: mockOrdersWithDifferentDates,
      },
    });

    render(<AdminMainPageComp />);

    // Initially should show only today's orders
    expect(screen.getAllByTestId('total-price')).toHaveLength(1);
  });

  it('handles empty orders array', () => {
    (useGetOrdersQuery as jest.Mock).mockReturnValue({
      data: {
        getOrders: [],
      },
    });

    render(<AdminMainPageComp />);

    expect(screen.getByText('Огноогоор тохирсон захиалга байхгүй')).toBeInTheDocument();
  });

  it('renders the status select with correct options', async () => {
    render(<AdminMainPageComp />);

    const selectTrigger = screen.getAllByTestId('status-select-button');
    fireEvent.pointerDown(selectTrigger[0]);

    await waitFor(() => {
      expect(screen.getByTestId('belen-test')).toBeInTheDocument();
      expect(screen.getByTestId('pending-test')).toBeInTheDocument();
      expect(screen.getByTestId('inpro-test')).toBeInTheDocument();
      expect(screen.getByTestId('done-test')).toBeInTheDocument();
    });
  });

  it('displays correct currency format', () => {
    const ordersWithLargePrice = [
      {
        ...mockOrders[0],
        items: [
          {
            ...mockOrders[0].items[0],
            price: 1000000,
            quantity: 1,
          },
        ],
      },
    ];

    (useGetOrdersQuery as jest.Mock).mockReturnValue({
      data: {
        getOrders: ordersWithLargePrice,
      },
    });

    render(<AdminMainPageComp />);

    const totalPrice = screen.getByTestId('total-price');
    expect(totalPrice).toHaveTextContent("1'000'000₮");
  });

  it('handles missing order data gracefully', () => {
    const incompleteOrder = [
      {
        _id: '1',
        tableId: 'Table 1',
        createdAt: new Date().toISOString(),
        items: [
          {
            name: 'Test Food',
            // Missing price and quantity
            imageUrl: '/test-image.jpg',
          },
        ],
      },
    ];

    (useGetOrdersQuery as jest.Mock).mockReturnValue({
      data: {
        getOrders: incompleteOrder,
      },
    });

    render(<AdminMainPageComp />);

    // Should render without crashing
    expect(screen.getByText('Test Food')).toBeInTheDocument();
  });

  it('handles undefined date correctly', () => {
    const { rerender } = render(<AdminMainPageComp />);

    // Force date to be undefined by manipulating React state
    const originalUseState = React.useState;
    jest.spyOn(React, 'useState').mockImplementationOnce(() => [undefined, jest.fn()]);

    rerender(<AdminMainPageComp />);

    // Should show no orders when date is undefined
    expect(screen.queryByTestId('total-price')).not.toBeInTheDocument();

    // Restore original useState
    jest.spyOn(React, 'useState').mockImplementation(originalUseState);
  });

  it('shows and interacts with calendar correctly', async () => {
    const user = userEvent.setup();
    render(<AdminMainPageComp />);

    // Find calendar button
    const calendarButton = screen.getByTestId('calendar-trig-button');

    // Click the button
    await user.click(calendarButton);

    // Verify calendar content
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('grid')).toBeInTheDocument();
  });

  it('shows today text for current date', () => {
    render(<AdminMainPageComp />);

    const calendarButton = screen.getByRole('button', {
      name: /өнөөдөр/i,
    });
    expect(calendarButton).toHaveTextContent('Өнөөдөр');
  });

  it('interacts with filter status button', () => {
    render(<AdminMainPageComp />);

    const filterButton = screen.getByRole('button', {
      name: /төлөв/i,
    });

    fireEvent.click(filterButton);

    // Verify button state after click (you might need to add specific behavior expectations)
    expect(filterButton).toBeInTheDocument();
  });

  it('displays default image when imageUrl is undefined', () => {
    const ordersWithUndefinedImage = [
      {
        _id: '1',
        tableId: 'Table 1',
        createdAt: new Date().toISOString(),
        items: [
          {
            name: 'Test Food',
            price: 10000,
            quantity: 2,
            // imageUrl is intentionally undefined
          },
        ],
      },
    ];

    (useGetOrdersQuery as jest.Mock).mockReturnValue({
      data: {
        getOrders: ordersWithUndefinedImage,
      },
    });

    render(<AdminMainPageComp />);

    const defaultImage = screen.getByRole('img', { name: 'food' });
    expect(defaultImage).toHaveAttribute('src', '/default-image.jpg');
  });

  it('displays default image when imageUrl is missing', () => {
    const ordersWithMissingImage = [
      {
        ...mockOrders[0],
        items: [
          {
            ...mockOrders[0].items[0],
            imageUrl: undefined,
          },
        ],
      },
    ];

    (useGetOrdersQuery as jest.Mock).mockReturnValue({
      data: {
        getOrders: ordersWithMissingImage,
      },
    });

    render(<AdminMainPageComp />);

    const images = screen.getAllByRole('img');
    const defaultImage = images.find((img) => img.getAttribute('src') === '/default-image.jpg');
    expect(defaultImage).toBeInTheDocument();
  });

  it('displays date in Mongolian format when not today', () => {
    // Mock useState to set a specific date
    const testDate = new Date(2024, 0, 15); // January 15, 2024
    jest.spyOn(React, 'useState').mockImplementationOnce(() => [testDate, jest.fn()]);

    render(<AdminMainPageComp />);

    // Format we expect to see (e.g., "1 сарын 15")
    const expectedFormattedDate = format(testDate, "L 'сарын' d", { locale: mn });

    const dateButton = screen.getByRole('button', {
      name: new RegExp(expectedFormattedDate, 'i'),
    });

    expect(dateButton).toBeInTheDocument();
    expect(dateButton).toHaveTextContent(expectedFormattedDate);
  });

  it('handles null orders in the orders array', () => {
    // Mock orders array with a null order
    const ordersWithNull = [mockOrders[0], null, mockOrders[1]];

    (useGetOrdersQuery as jest.Mock).mockReturnValue({
      data: {
        getOrders: ordersWithNull,
      },
    });

    render(<AdminMainPageComp />);

    // Verify only non-null orders are rendered
    const orderElements = screen.getAllByTestId('total-price');
    expect(orderElements).toHaveLength(2); // Should only render 2 orders, skipping the null one

    // Verify specific orders are rendered
    expect(screen.getByText('Table 1')).toBeInTheDocument();
    expect(screen.getByText('Table 2')).toBeInTheDocument();
  });
});
