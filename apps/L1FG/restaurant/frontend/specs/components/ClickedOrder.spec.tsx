import ClickedOrder from '@/components/order/ClickedOrder';
import { useCart } from '@/components/providers';
import { render, screen, fireEvent } from '@testing-library/react';

// Mock useCart
jest.mock('@/components/providers', () => ({
  useCart: jest.fn(),
}));

describe('ClickedOrder Component', () => {
  const mockRemoveFromCart = jest.fn();

  beforeEach(() => {
    (useCart as jest.Mock).mockReturnValue({ removeFromCart: mockRemoveFromCart });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockFood = {
    id: 'food1',
    foodName: 'Pizza',
    imageUrl: 'pizza.jpg',
    price: 10,
    status: 'available',
  };

  test('renders delete button when item is in orders', () => {
    render(<ClickedOrder food={mockFood} orders={[{ _id: 'food1', quantity: 1 }]} />);

    screen.getByTestId('delete-button-food1');
  });

  test('does not render delete button when item is not in orders', () => {
    render(
      <ClickedOrder
        food={mockFood}
        orders={[]} // No matching order
      />
    );

    screen.queryByTestId('delete-button-food1');
  });

  test('calls removeFromCart when delete button is clicked', () => {
    render(<ClickedOrder food={mockFood} orders={[{ _id: 'food1', quantity: 1 }]} />);

    const deleteButton = screen.getByTestId('delete-button-food1');
    fireEvent.click(deleteButton);

    expect(mockRemoveFromCart).toHaveBeenCalledWith('food1');
  });
});
