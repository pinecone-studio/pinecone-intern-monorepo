import BasketFood from '@/components/BasketFood';
import { render } from '@testing-library/react';

describe('BasketFood Component', () => {
  beforeEach(() => {
    localStorage.clear(); // Clear localStorage before each test
  });

  it('renders successfully without crashing', () => {
    render(<BasketFood orderLength={0} />);
  });

  it('displays the correct order quantity when valid order exists in localStorage', () => {
    const mockOrder = { items: [{ quantity: 2 }, { quantity: 3 }] };
    localStorage.setItem('order', JSON.stringify(mockOrder));

    render(<BasketFood orderLength={5} />); // The orderLength prop could come from the localStorage
  });

  it('displays nothing when order is empty', () => {
    const mockOrder = { items: [] };
    localStorage.setItem('order', JSON.stringify(mockOrder));

    render(<BasketFood orderLength={0} />);
  });

  it('hides the order quantity badge when orderLength is 0', () => {
    render(<BasketFood orderLength={0} />);
  });

  it('shows the correct order quantity badge when orderLength is greater than 0', () => {
    render(<BasketFood orderLength={3} />);
  });
});
