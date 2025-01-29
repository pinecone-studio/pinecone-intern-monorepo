/* eslint-disable max-lines */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import { useRouter } from 'next/navigation';
import OrderList from '@/components/order/OrderList';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock localStorage
const mockLocalStorage = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem: jest.fn((key) => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt} />;
  },
}));

describe('OrderList Component', () => {
  const mockRouter = {
    push: jest.fn(),
  };

  const mockUpdateItemQuantity = jest.fn();
  const mockRemoveItem = jest.fn();

  const mockSelectedItems = [
    { id: '1', foodName: 'Item A', imageUrl: '/image1.jpg', price: 500, categoryId: '1', quantity: 1 },
    { id: '2', foodName: 'Item B', imageUrl: '/image2.jpg', price: 1000, categoryId: '2', quantity: 1 },
    { id: '3', foodName: 'Item C', imageUrl: '/image3.jpg', price: 1500, categoryId: '3', quantity: 1 },
  ];

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();

    // Setup the router mock before each test
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  test('renders order button when items are selected', () => {
    render(<OrderList selectedItems={mockSelectedItems} updateItemQuantity={mockUpdateItemQuantity} removeItem={mockRemoveItem} tableNumber={5} />);

    const orderButton = screen.getByTestId('order-button');
    expect(orderButton).toBeInTheDocument();
  });

  test('handles order submission', async () => {
    render(<OrderList selectedItems={mockSelectedItems} updateItemQuantity={mockUpdateItemQuantity} removeItem={mockRemoveItem} tableNumber={5} />);

    // Open the drawer by clicking the order button
    const orderButton = screen.getByTestId('order-button');
    fireEvent.click(orderButton);

    // Wait for the submit order button to appear
    const submitOrderButton = await screen.findByTestId('submit-order-button');

    // Submit the order
    fireEvent.click(submitOrderButton);

    // Check localStorage and router navigation
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'order',
      JSON.stringify({
        tableId: 5,
        items: mockSelectedItems.map((item) => ({
          name: item.foodName,
          quantity: item.quantity,
          price: item.price,
          imageUrl: item.imageUrl,
        })),
      })
    );

    // Verify router push method is called
    expect(mockRouter.push).toHaveBeenCalledWith('/qpay');
  });

  test('displays items in the drawer', () => {
    render(<OrderList selectedItems={mockSelectedItems} updateItemQuantity={mockUpdateItemQuantity} removeItem={mockRemoveItem} tableNumber={5} />);

    // Open drawer
    const orderButton = screen.getByTestId('order-button');
    fireEvent.click(orderButton);

    // Check if items are rendered
    const foodNames = screen.getAllByTestId('food-name');
    expect(foodNames).toHaveLength(3); // Updated to expect 3 items
    expect(foodNames[0]).toHaveTextContent('Item A');
    expect(foodNames[1]).toHaveTextContent('Item B');
    expect(foodNames[2]).toHaveTextContent('Item C');
  });

  test('handles quantity increase', () => {
    render(<OrderList selectedItems={mockSelectedItems} updateItemQuantity={mockUpdateItemQuantity} removeItem={mockRemoveItem} tableNumber={5} />);

    // Open drawer
    const orderButton = screen.getByTestId('order-button');
    fireEvent.click(orderButton);

    // Find increase buttons
    const increaseButtons = screen.getAllByTestId('increase-button');
    fireEvent.click(increaseButtons[0]);

    // Correct expected value to 2
    expect(mockUpdateItemQuantity).toHaveBeenCalledWith('1', 2);
  });

  test('formats prices below and above 1000 correctly in the OrderList', () => {
    render(<OrderList selectedItems={mockSelectedItems} updateItemQuantity={jest.fn()} removeItem={jest.fn()} tableNumber={5} />);

    // Open the drawer to ensure content is rendered
    fireEvent.click(screen.getByTestId('order-button'));

    // Find all prices and validate their text content
    const prices = screen.getAllByTestId('food-price');
    expect(prices[0]).toHaveTextContent('500'); // Below 1000
    expect(prices[1]).toHaveTextContent('1.0к'); // At 1000
    expect(prices[2]).toHaveTextContent('1.5к'); // Above 1000
  });

  test('handles quantity decrease', () => {
    const initialItems = [{ id: '1', foodName: 'Item A', imageUrl: '/image1.jpg', price: 500, categoryId: '1', quantity: 2 }];

    render(<OrderList selectedItems={initialItems} updateItemQuantity={mockUpdateItemQuantity} removeItem={mockRemoveItem} tableNumber={5} />);

    // Open drawer
    const orderButton = screen.getByTestId('order-button');
    fireEvent.click(orderButton);

    // Find decrease button and click it
    const decreaseButtons = screen.getAllByTestId('decrease-button');
    fireEvent.click(decreaseButtons[0]);

    // Expect quantity to decrease to 1
    expect(mockUpdateItemQuantity).toHaveBeenCalledWith('1', 1);
  });

  test('handles item deletion', () => {
    render(<OrderList selectedItems={mockSelectedItems} updateItemQuantity={mockUpdateItemQuantity} removeItem={mockRemoveItem} tableNumber={5} />);

    // Open drawer
    const orderButton = screen.getByTestId('order-button');
    fireEvent.click(orderButton);

    // Find delete buttons
    const deleteButtons = screen.getAllByTestId('delete-button');
    fireEvent.click(deleteButtons[0]);

    expect(mockRemoveItem).toHaveBeenCalledWith('1');
  });

  test('displays empty state when no items selected', () => {
    render(<OrderList selectedItems={[]} updateItemQuantity={mockUpdateItemQuantity} removeItem={mockRemoveItem} tableNumber={5} />);

    // Open drawer
    const orderButton = screen.getByTestId('order-button');
    fireEvent.click(orderButton);

    // Check empty state
    const emptyState = screen.getByTestId('empty-state');
    expect(emptyState).toHaveTextContent('Хоосон байна.');
  });

  test('updates item quantity when new quantity is greater than 0', () => {
    const items = [{ id: '1', foodName: 'Item A', imageUrl: '/image1.jpg', price: 500, categoryId: '1', quantity: 1 }];

    render(<OrderList selectedItems={items} updateItemQuantity={mockUpdateItemQuantity} removeItem={mockRemoveItem} tableNumber={5} />);

    const orderButton = screen.getByTestId('order-button');
    fireEvent.click(orderButton);

    const increaseButtons = screen.getAllByTestId('increase-button');
    fireEvent.click(increaseButtons[0]); // Simulate increasing the quantity

    expect(mockUpdateItemQuantity).toHaveBeenCalledWith('1', 2); // Expect quantity to increase to 2
  });

  test('does not update item quantity when new quantity is less than or equal to 0', () => {
    const items = [{ id: '1', foodName: 'Item A', imageUrl: '/image1.jpg', price: 500, categoryId: '1', quantity: 1 }];

    render(<OrderList selectedItems={items} updateItemQuantity={mockUpdateItemQuantity} removeItem={mockRemoveItem} tableNumber={5} />);

    const orderButton = screen.getByTestId('order-button');
    fireEvent.click(orderButton);

    const decreaseButtons = screen.getAllByTestId('decrease-button');
    fireEvent.click(decreaseButtons[0]); // Simulate decreasing the quantity

    expect(mockUpdateItemQuantity).not.toHaveBeenCalled(); // Expect no update
  });
});
