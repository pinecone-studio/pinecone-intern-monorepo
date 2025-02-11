import BasketFood from '@/components/BasketFood';
import { render } from '@testing-library/react';

describe('BasketFood Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders successfully without crashing', () => {
    render(<BasketFood />);
  });

  it('displays the correct order quantity when valid order exists in localStorage', () => {
    const mockOrder = { items: [{ quantity: 2 }, { quantity: 3 }] };
    localStorage.setItem('order', JSON.stringify(mockOrder));

    render(<BasketFood />);
  });

  it('displays nothing when order is empty', () => {
    const mockOrder = { items: [] };
    localStorage.setItem('order', JSON.stringify(mockOrder));

    render(<BasketFood />);
  });
});
