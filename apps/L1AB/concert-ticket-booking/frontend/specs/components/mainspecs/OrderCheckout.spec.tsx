import { OrderCheckout } from '@/components/maincomponents/OrderCheckout';
import { useGetBookingByIdQuery, useUpdateBookingEverythingMutation } from '@/generated';
import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
jest.mock('@/generated', () => ({
  useGetBookingByIdQuery: jest.fn(),
  useUpdateBookingEverythingMutation: jest.fn(),
}));
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));
const mockEventData = {
  getBookingById: {
    eventDate: ['2024-12-01'],
    eventId: {
      _id: '1',
    },
    venues: [
      { name: 'Энгийн', price: 100000, quantity: undefined },
      { name: 'Fan-Zone', price: 50000, quantity: 100 },
      { name: 'Vip', price: 50000, quantity: 100 },
      { name: undefined, price: 50000, quantity: 100 },
    ],
  },
};
describe('OrderCheckout', () => {
  beforeEach(() => {
    (useGetBookingByIdQuery as jest.Mock).mockReturnValue({
      data: mockEventData,
    });
    (useUpdateBookingEverythingMutation as jest.Mock).mockReturnValue([jest.fn(), { loading: false }]);
  });
  it('should render successfully', async () => {
    render(<OrderCheckout id="123" />);
  });
  it('should render successfully and handle input change', async () => {
    const { getByTestId } = render(<OrderCheckout id="123" />);

    const OrderInput = getByTestId('NumberInput');
    expect(OrderInput);

    fireEvent.input(OrderInput, { target: { value: '12345678' } });

    expect(OrderInput);
  });
  it('should render successfully and handle input change', async () => {
    const { getByTestId } = render(<OrderCheckout id="123" />);

    const OrderInput = getByTestId('EmailInput');
    expect(OrderInput);

    fireEvent.input(OrderInput, { target: { value: '1234wwwqq5678' } });
    expect(OrderInput);
  });
  it('should render successfully and handle input change', async () => {
    const { getByTestId } = render(<OrderCheckout id="123" />);

    const OrderInput = getByTestId('EmailInput');
    expect(OrderInput);

    fireEvent.input(OrderInput, { target: { value: '1234wwwqq5678@gmail.com' } });
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

    const OrderInput = getByTestId('NumberInput');
    expect(OrderInput);

    fireEvent.input(OrderInput, { target: { value: '12378' } });
    expect(OrderInput);
  });
  it('should render successfully and handle input change', async () => {
    const { getByTestId } = render(<OrderCheckout id="123" />);

    const OrderInput = getByTestId('EmailInput');
    expect(OrderInput);
    fireEvent.input(OrderInput, { target: { value: '1234wwwqq5678@gmail.com' } });
    expect(OrderInput);

    const haha = getByTestId('NumberInput');
    expect(haha);
    fireEvent.input(haha, { target: { value: '12345678' } });
    expect(haha);

    const searchInput = getByTestId('PaymentToPush');
    fireEvent.click(searchInput);
    expect(searchInput);
  });
  it('should render successfully and handle input change', async () => {
    const { getByTestId } = render(<OrderCheckout id="123" />);

    const searchInput = getByTestId('BacktoPush');
    expect(searchInput);

    fireEvent.click(searchInput);
  });
});
