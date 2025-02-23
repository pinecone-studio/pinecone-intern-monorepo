import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useCart } from '@/components/providers/LocalProvider';
import BasketFood from '@/components/BasketFood';
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));
beforeAll(() => {
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
});
jest.mock('@/components/providers/LocalProvider', () => ({
  useCart: jest.fn(),
}));
describe('BasketFood Component', () => {
  beforeEach(() => {
    localStorage.clear(); // Clear localStorage before each test
  });

  it('hides the order quantity badge when orderLength is 0', () => {
    (useCart as jest.Mock).mockReturnValue({
      orders: [],
      addToCart: jest.fn(),
      minusFromCart: jest.fn(),
      removeFromCart: jest.fn(),
    });
    render(<BasketFood orderLength={0} />);
  });

  it('shows the correct order quantity badge when orderLength is greater than 0', () => {
    render(<BasketFood orderLength={3} />);
  });
});
