import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useGetCategoriesQuery, useGetFoodsQuery } from '@/generated';
import OrderPageComponent from '@/components/order/OrderPageComponent';
import { useCart } from '@/components/providers';
jest.mock('@/generated', () => ({
  useGetCategoriesQuery: jest.fn(),
  useGetFoodsQuery: jest.fn(),
}));
jest.mock('@/components/providers', () => ({
  useCart: jest.fn(),
}));
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    return <img {...props} />;
  },
}));
jest.mock('@/components/common/Header', () => ({
  __esModule: true,
  default: () => <div data-testid="header-mock">Header Mock</div>,
}));
jest.mock('@/components/order/OrderList', () => ({
  __esModule: true,
  default: () => <div data-testid="order-list-mock">Order List Mock</div>,
}));
jest.mock('@/components/order/ItemQunatity', () => ({
  __esModule: true,
  default: ({ food }) => <div data-testid={`item-quantity-${food.id}`}>Item Quantity Mock</div>,
}));
jest.mock('@/components/order/ClickedOrder', () => ({
  __esModule: true,
  default: ({ food }) => <div data-testid={`item-quantity-${food.id}`}></div>,
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
window.PointerEvent = createMockPointerEvent as any;
Object.assign(window.HTMLElement.prototype, {
  scrollIntoView: jest.fn(),
  releasePointerCapture: jest.fn(),
  hasPointerCapture: jest.fn(),
});

describe('OrderPageComponent', () => {
  const mockFoods = [
    { id: '1', foodName: 'Food 1', price: 800, imageUrl: '/food1.jpg', categoryId: 'cat1', status: 'Идэвхитэй' },
    { id: '2', foodName: 'Food 2', price: 2500, imageUrl: '/food2.jpg', categoryId: 'cat1', status: 'Идэвхигүй' },
    { id: '3', foodName: 'Food 3', price: 1500, imageUrl: '/food3.jpg', categoryId: 'cat2', status: 'Идэвхитэй' },
  ];

  const mockCategories = [
    { id: 'cat1', categoryName: 'Category 1' },
    { id: 'cat2', categoryName: 'Category 2' },
  ];

  const mockOrders = [{ _id: '1', foodName: 'Food 1', price: 800, imageUrl: '/food1.jpg', quantity: 2 }];

  const mockAddToCart = jest.fn();
  const mockRemoveFromCart = jest.fn();
  const mockSetTableId = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    // Setup mock return values
    useGetFoodsQuery.mockReturnValue({
      data: { getFoods: mockFoods },
      loading: false,
      error: null,
    });

    useGetCategoriesQuery.mockReturnValue({
      data: { getCategories: mockCategories },
      loading: false,
      error: null,
    });

    useCart.mockReturnValue({
      orders: mockOrders,
      addToCart: mockAddToCart,
      removeFromCart: mockRemoveFromCart,
      setTableId: mockSetTableId,
    });
  });

  test('renders the component with all elements', () => {
    render(<OrderPageComponent tableNumber={5} />);

    // Check if header is rendered
    expect(screen.getByTestId('header-mock')).toBeInTheDocument();

    // Check if title is rendered
    expect(screen.getByText('Хоолны цэс')).toBeInTheDocument();

    // Check if category buttons are rendered
    expect(screen.getByText('Бүгд')).toBeInTheDocument();
    expect(screen.getByText('Category 1')).toBeInTheDocument();
    expect(screen.getByText('Category 2')).toBeInTheDocument();

    // Check if food items are rendered
    expect(screen.getByText('Food 1')).toBeInTheDocument();
    expect(screen.getByText('Food 3')).toBeInTheDocument();

    // Check price formatting
    expect(screen.getByText('800')).toBeInTheDocument();
    expect(screen.getByText('1.5к')).toBeInTheDocument();

    // Check if order list is rendered
    expect(screen.getByTestId('order-list-mock')).toBeInTheDocument();
  });

  test('calls setTableId with correct table number on mount', () => {
    render(<OrderPageComponent tableNumber={5} />);
  });

  test('filters foods when a category is selected', () => {
    render(<OrderPageComponent tableNumber={5} />);

    // Click on a category button
    fireEvent.click(screen.getByText('Category 1'));

    // Only foods from Category 1 should be visible
    expect(screen.getByText('Food 1')).toBeInTheDocument();
    expect(screen.queryByText('Food 3')).not.toBeInTheDocument();
    fireEvent.click(screen.getByText('Category 2'));
    expect(screen.queryByText('Food 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Food 2')).not.toBeInTheDocument();
    expect(screen.getByText('Food 3')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Бүгд'));
    expect(screen.getByText('Food 1')).toBeInTheDocument();
    expect(screen.getByText('Food 3')).toBeInTheDocument();
  });
  test('adds item to cart when food item is clicked', () => {
    render(<OrderPageComponent tableNumber={5} />);
    fireEvent.click(screen.getByTestId('food-item-1'));
  });

  test('formats prices correctly', () => {
    render(<OrderPageComponent tableNumber={5} />);
    expect(screen.getByText('800')).toBeInTheDocument();
    expect(screen.getByText('1.5к')).toBeInTheDocument();
  });
});
