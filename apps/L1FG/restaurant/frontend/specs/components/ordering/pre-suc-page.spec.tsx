import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';
import { useMakeOrderMutation } from '@/generated';
import PreSuccessPageComp from '@/components/order/PreSuccessPageComp';

// Mock necessary modules
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/generated', () => ({
  useMakeOrderMutation: jest.fn(),
}));

describe('PreSuccessPageComp', () => {
  const mockRouter = {
    push: jest.fn(),
    back: jest.fn(),
  };
  const mockMakeOrder = jest.fn();

  const mockOrder = {
    items: [
      {
        id: '1',
        name: 'Pizza',
        imageUrl: '/pizza.png',
        price: 10,
        categoryId: 'food',
        quantity: 2,
      },
    ],
    tableId: '123',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();

    // Setup default mocks
    useRouter.mockReturnValue(mockRouter);
    useMakeOrderMutation.mockReturnValue([mockMakeOrder]);
  });

  const renderComponent = (order = mockOrder) => {
    localStorage.setItem('order', JSON.stringify(order));
    return render(<PreSuccessPageComp />);
  };

  test('renders payment methods and total price', () => {
    renderComponent();

    // Verify payment method elements
    expect(screen.getByTestId('qpay-button')).toBeInTheDocument();
    expect(screen.getByTestId('wallet-button')).toBeInTheDocument();

    // Check total price
    expect(screen.getByText('Захиалгын нийт дүн:')).toBeInTheDocument();
    expect(screen.getByText('Төлөх дүн:')).toBeInTheDocument();

    // Check the total price values are in the document
    const priceElements = screen.queryAllByText('20₮');
    expect(priceElements.length).toBeGreaterThan(0); // Checks if at least one '20₮' element is found
    expect(priceElements[0]).toBeInTheDocument(); // Optionally, you can check the first one or iterate over them
  });

  test('handles close button click', () => {
    renderComponent();

    const closeButton = screen.getByTestId('close-button');
    fireEvent.click(closeButton);

    expect(mockRouter.back).toHaveBeenCalled();
  });

  test('submits order via Qpay button successfully', async () => {
    renderComponent();

    const mockData = {
      data: {
        makeOrder: {
          _id: 'orderId123',
        },
      },
    };
    mockMakeOrder.mockResolvedValueOnce(mockData);

    const qpayButton = screen.getByTestId('qpay-button');
    fireEvent.click(qpayButton);

    await waitFor(() => {
      expect(mockMakeOrder).toHaveBeenCalledWith({
        variables: {
          input: {
            tableId: 123,
            items: [
              {
                name: 'Pizza',
                quantity: 2,
                price: 10,
                imageUrl: '/pizza.png',
              },
            ],
          },
        },
      });
      expect(mockRouter.push).toHaveBeenCalledWith('/payment-successful');
    });
  });

  test('handles order mutation error', async () => {
    renderComponent();

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation((message) => {
      // Optionally log the message or handle it as needed
      console.log('Mocked console.error:', message);
    });
    mockMakeOrder.mockRejectedValueOnce(new Error('Order failed'));

    const qpayButton = screen.getByTestId('qpay-button');
    fireEvent.click(qpayButton);

    await waitFor(() => {
      expect(mockMakeOrder).toHaveBeenCalled();
      expect(console.error).toHaveBeenCalledWith('Error making order:', expect.any(Error));
    });

    consoleErrorSpy.mockRestore();
  });

  test('handles empty order in localStorage', () => {
    localStorage.clear(); // Make sure localStorage is empty
    render(<PreSuccessPageComp />);

    // Verify no price or items are shown
    expect(screen.queryByText('Захиалгын нийт дүн:')).not.toBeInTheDocument();
    expect(screen.queryByText('Төлөх дүн:')).not.toBeInTheDocument();
  });

  test('calculates total price correctly', () => {
    const multiItemOrder = {
      items: [
        { id: '1', name: 'Pizza', price: 10, quantity: 2 },
        { id: '2', name: 'Burger', price: 15, quantity: 3 },
      ],
      tableId: '123',
    };

    renderComponent(multiItemOrder);

    // Total price should be (10 * 2) + (15 * 3) = 20 + 45 = 65
    const priceElements = screen.getAllByText('65₮');
    expect(priceElements.length).toBeGreaterThan(0); // Ensure there is at least one element with the text "65₮"
    expect(priceElements[0]).toBeInTheDocument(); // Check that the first element is in the document
  });
});
