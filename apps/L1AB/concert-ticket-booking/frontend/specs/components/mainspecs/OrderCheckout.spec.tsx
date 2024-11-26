import { OrderCheckout } from '@/components/maincomponents/OrderCheckout';
import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));
describe('OrderCheckout', () => {
  it('should render successfully', async () => {
    render(<OrderCheckout id="123" />);
  });
  it('should render successfully and handle input change', async () => {
    const { getByTestId } = render(<OrderCheckout id="123" />);

    const OrderInput = getByTestId('OrderInput');
    expect(OrderInput);

    fireEvent.input(OrderInput, { target: { value: '12349995678' } });

    expect(OrderInput);
  });
  it('should render successfully and handle input change', async () => {
    const { getByTestId } = render(<OrderCheckout id="123" />);

    const OrderInput = getByTestId('OrderInput');
    expect(OrderInput);

    fireEvent.input(OrderInput, { target: { value: '1234wwwqq5678' } });
    expect(OrderInput);
  });
  it('should render successfully and handle input change', async () => {
    const { getByTestId } = render(<OrderCheckout id="123" />);

    const searchInput = getByTestId('PaymentToPush');
    expect(searchInput);

    fireEvent.click(searchInput);
  });
  it('should render successfully and handle input change', async () => {
    const { getByTestId } = render(<OrderCheckout id="123" />);

    const searchInput = getByTestId('BacktoPush');
    expect(searchInput);

    fireEvent.click(searchInput);
  });
});
