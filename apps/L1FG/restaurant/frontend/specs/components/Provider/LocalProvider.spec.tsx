import { render, screen, fireEvent } from '@testing-library/react';
import { CartProvider, useCart } from '@/components/providers/LocalProvider';
import '@testing-library/jest-dom';

// A custom component to use the Cart context hook
const TestComponent = () => {
  const { orders, addToCart, removeFromCart, clearCart, cartItemsTotalPrice, deliveryFee } = useCart();

  return (
    <div>
      <button onClick={() => addToCart({ _id: '1', foodName: 'Pizza', quantity: 1, price: 10, imageUrl: '' })}>Add Pizza</button>
      <button onClick={() => removeFromCart('1')}>Remove Pizza</button>
      <button onClick={clearCart}>Clear Cart</button>
      <div>Total Price: {cartItemsTotalPrice}</div>
      <div>Delivery Fee: {deliveryFee}</div>
      <div>Orders: {orders.length}</div>
    </div>
  );
};

describe('CartProvider', () => {
  it('should add an item to the cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    fireEvent.click(screen.getByText('Add Pizza'));
    expect(screen.getByText('Orders: 1')).toBeInTheDocument();
    expect(screen.getByText('Total Price: 10')).toBeInTheDocument();
  });

  it('should remove an item from the cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    fireEvent.click(screen.getByText('Add Pizza'));
    fireEvent.click(screen.getByText('Remove Pizza'));
    expect(screen.getByText('Orders: 0')).toBeInTheDocument();
    expect(screen.getByText('Total Price: 0')).toBeInTheDocument();
  });

  it('should clear the cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    fireEvent.click(screen.getByText('Add Pizza'));
    fireEvent.click(screen.getByText('Clear Cart'));
    expect(screen.getByText('Orders: 0')).toBeInTheDocument();
  });

  it('should correctly apply the delivery fee', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    fireEvent.click(screen.getByText('Add Pizza'));
    expect(screen.getByText('Delivery Fee: 5000')).toBeInTheDocument();
  });
});
