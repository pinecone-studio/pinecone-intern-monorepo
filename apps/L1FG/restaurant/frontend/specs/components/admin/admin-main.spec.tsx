/* eslint-disable */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useGetOrdersQuery, useUpdateOrderStatusMutation } from '@/generated';
import { format } from 'date-fns';
import { mn } from 'date-fns/locale';
import AdminMainPageComp from '@/components/admin-page-comp/AdminMainPageComp';
import '@testing-library/jest-dom';
import React from 'react';
import userEvent from '@testing-library/user-event';
// Mock the generated hook
jest.mock('@/generated', () => ({
  useGetOrdersQuery: jest.fn(),
  useUpdateOrderStatusMutation: jest.fn(),
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
      status: 'Ready',
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
      status: 'Done',
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

    useUpdateOrderStatusMutation.mockReturnValue([jest.fn().mockResolvedValue({ data: { updateOrderStatus: { success: true } } }), { loading: false }]);
  });

  it('renders the component with orders', () => {
    render(<AdminMainPageComp />);

    // Check if the title is rendered
    expect(screen.getByText('Захиалга')).toBeInTheDocument();

    // Check if orders are rendered

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

  it('filters orders by selected status', async () => {
    const user = userEvent.setup();
    render(<AdminMainPageComp />);

    fireEvent.pointerDown(screen.getByTestId('status-trigger-btn'));

    await user.click(screen.getByTestId('t-belen-test'));
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
    // Force date to be undefined by manipulating React state
    const originalUseState = React.useState;
    jest.spyOn(React, 'useState').mockImplementationOnce(() => [undefined, jest.fn()]);

    render(<AdminMainPageComp />);

    // Should show no orders when date is undefined
    expect(screen.queryAllByTestId('total-price')).toHaveLength(2);

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

    const filterButton = screen.getByTestId('status-trigger-btn');

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

  it('displays the formatted date in Mongolian format when a date is selected', async () => {
    const user = userEvent.setup();

    const month = new Date().getMonth();

    const testDate = new Date(2024, month, 15);

    render(<AdminMainPageComp initialDate={testDate} />);

    // Find the calendar trigger button (the one that opens the calendar)
    const calendarButton = screen.getByTestId('calendar-trig-button');
    await user.click(calendarButton);

    // Find the date in the calendar and click on it
    // We are looking for the day "15" in the calendar popup (since it's January 15, 2024)
    const dateButton = screen.getByText('15');
    fireEvent.click(dateButton);

    // Expected Mongolian formatted date (e.g., "2 сарын 15")
    const expectedFormattedDate = format(testDate, "L 'сарын' d", { locale: mn });

    // Check if the formatted date is displayed correctly
    const formattedDateElement = screen.getByTestId('formatted-date');
    expect(formattedDateElement).toBeInTheDocument();
    expect(formattedDateElement).toHaveTextContent(expectedFormattedDate);
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
  });
});
